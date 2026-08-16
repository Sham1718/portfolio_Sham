"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { architectures } from "@/data/architectures";
import { ArchitectureConnection } from "@/components/background/ArchitectureConnection";
import { ArchitectureNode } from "@/components/background/ArchitectureNode";
import { DataPacket } from "@/components/background/DataPacket";
import type {
  ArchitectureModel,
  ArchitectureNode as ArchitectureNodeModel,
  ArchitectureScrollUpdate,
  ArchitectureState,
} from "@/types/architecture";

const nodeWidth = (node: ArchitectureNodeModel) =>
  Math.max(118, node.label.length * 7.4 + 28);
const nodeTransform = (node: ArchitectureNodeModel) => {
  const { x, y } = node.position;
  return `translate(${x - nodeWidth(node) / 2} ${y - 17})`;
};
const depthOpacity = { far: 0.38, mid: 0.56, near: 0.72 } as const;

export function ArchitectureCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeGroupRefs = useRef(new Map<string, SVGGElement>());
  const nodeRefs = useRef(new Map<string, SVGRectElement>());
  const labelRefs = useRef(new Map<string, SVGTextElement>());
  const connectionRefs = useRef(new Map<string, SVGLineElement>());
  const packetRefs = useRef(new Map<string, SVGCircleElement>());
  const activeModel = useRef<ArchitectureModel>(architectures.hero);
  const packetTimeline = useRef<gsap.core.Timeline | null>(null);
  const canAnimate = useRef(false);
  const nodesById = useMemo(
    () => new Map(architectures.hero.nodes.map((node) => [node.id, node])),
    [],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
    );

    const activate = (nodeId: string, connectionId?: string) => {
      const node = nodeRefs.current.get(nodeId);
      const connection = connectionId
        ? connectionRefs.current.get(connectionId)
        : undefined;
      if (node) {
        gsap.to(node, { strokeOpacity: 1, duration: 0.16, yoyo: true, repeat: 1 });
      }
      if (connection) {
        gsap.to(connection, {
          strokeOpacity: 0.76,
          duration: 0.16,
          yoyo: true,
          repeat: 1,
        });
      }
    };

    const runPackets = () => {
      packetTimeline.current?.kill();
      packetTimeline.current = null;
      if (!canAnimate.current) return;

      const model = activeModel.current;
      const positions = new Map(model.nodes.map((node) => [node.id, node.position]));
      const request = model.packets[0];
      const response = model.packets[1];
      const requestPacket = packetRefs.current.get(request.id);
      const responsePacket = packetRefs.current.get(response.id);
      const requestStart = positions.get(request.route[0]);
      const responseStart = positions.get(response.route[0]);
      if (!requestPacket || !responsePacket || !requestStart || !responseStart) return;

      const connectionFor = (from: string, to: string) =>
        model.connections.find(
          (connection) =>
            (connection.from === from && connection.to === to) ||
            (connection.from === to && connection.to === from),
        )?.id;

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.25 });
      timeline.set([requestPacket, responsePacket], { opacity: 0 });
      timeline.set(requestPacket, {
        attr: { cx: requestStart.x, cy: requestStart.y },
        opacity: 0.9,
      });

      request.route.slice(1).forEach((nodeId, index) => {
        const target = positions.get(nodeId);
        const from = request.route[index];
        if (!target) return;
        timeline.to(requestPacket, {
          attr: { cx: target.x, cy: target.y },
          duration: 0.7,
          ease: "power1.inOut",
          onStart: () => activate(nodeId, connectionFor(from, nodeId)),
        });
      });

      timeline.to(requestPacket, { opacity: 0, duration: 0.16 });
      timeline.set(
        responsePacket,
        { attr: { cx: responseStart.x, cy: responseStart.y }, opacity: 0.7 },
        "+=0.2",
      );
      response.route.slice(1).forEach((nodeId, index) => {
        const target = positions.get(nodeId);
        const from = response.route[index];
        if (!target) return;
        timeline.to(responsePacket, {
          attr: { cx: target.x, cy: target.y },
          duration: 0.66,
          ease: "power1.inOut",
          onStart: () => activate(nodeId, connectionFor(from, nodeId)),
        });
      });
      timeline.to(responsePacket, { opacity: 0, duration: 0.16 });
      packetTimeline.current = timeline;
    };

    const transitionTo = (state: ArchitectureState) => {
      const model = architectures[state];
      if (activeModel.current.state === state) return;
      activeModel.current = model;
      model.nodes.forEach((node) => {
        const group = nodeGroupRefs.current.get(node.id);
        const label = labelRefs.current.get(node.id);
        if (group) {
          gsap.to(group, {
            attr: { transform: nodeTransform(node) },
            opacity: depthOpacity[node.position.depth],
            duration: 0.7,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
        if (label && label.textContent !== node.label) {
          gsap.to(label, {
            opacity: 0,
            duration: 0.12,
            onComplete: () => {
              label.textContent = node.label;
              gsap.to(label, { opacity: 1, duration: 0.22 });
            },
          });
        }
      });

      const positionById = new Map(model.nodes.map((node) => [node.id, node.position]));
      const connectionSlots = Array.from(connectionRefs.current.entries());
      connectionSlots.forEach(([id, element], index) => {
        const connection = model.connections[index];
        const from = connection ? positionById.get(connection.from) : undefined;
        const to = connection ? positionById.get(connection.to) : undefined;
        gsap.to(element, {
          attr: from && to ? { x1: from.x, y1: from.y, x2: to.x, y2: to.y } : {},
          opacity: connection ? 1 : 0,
          duration: 0.7,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        if (connection) element.dataset.connection = id;
      });
      runPackets();
    };

    const updateMotion = () => {
      canAnimate.current = motionQuery.matches;
      runPackets();
    };
    const onArchitectureUpdate = (event: Event) => {
      const { state } = (event as CustomEvent<ArchitectureScrollUpdate>).detail;
      transitionTo(state);
    };

    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    window.addEventListener("architecture-state-change", onArchitectureUpdate);
    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("architecture-state-change", onArchitectureUpdate);
      packetTimeline.current?.kill();
    };
  }, []);

  const getNode = (id: string) => nodesById.get(id);
  const initialConnections = architectures.hero.connections;

  return (
    <div className="absolute inset-0 [transform:perspective(1200px)_rotateX(1deg)_translateZ(0)]">
      <svg ref={svgRef} aria-hidden="true" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" className="hidden h-full w-full sm:block">
        <g opacity="0.78">
          {initialConnections.map((connection) => {
            const from = getNode(connection.from)?.position;
            const to = getNode(connection.to)?.position;
            if (!from || !to) return null;
            return <ArchitectureConnection key={connection.id} id={connection.id} from={from} to={to} activationRef={(element) => { if (element) connectionRefs.current.set(connection.id, element); else connectionRefs.current.delete(connection.id); }} />;
          })}
        </g>
        <g>
          {architectures.hero.nodes.map((node) => (
            <ArchitectureNode key={node.id} node={node} groupRef={(element) => { if (element) nodeGroupRefs.current.set(node.id, element); else nodeGroupRefs.current.delete(node.id); }} activationRef={(element) => { if (element) nodeRefs.current.set(node.id, element); else nodeRefs.current.delete(node.id); }} labelRef={(element) => { if (element) labelRefs.current.set(node.id, element); else labelRefs.current.delete(node.id); }} />
          ))}
        </g>
        <g>{architectures.hero.packets.map((packet) => { const start = getNode(packet.route[0])?.position; return start ? <DataPacket key={packet.id} x={start.x} y={start.y} packetRef={(element) => { if (element) packetRefs.current.set(packet.id, element); else packetRefs.current.delete(packet.id); }} /> : null; })}</g>
      </svg>
      <svg aria-hidden="true" viewBox="0 0 320 640" preserveAspectRatio="xMidYMid slice" className="h-full w-full sm:hidden">
        <g fill="none" stroke="#67e8f9" strokeOpacity="0.18" strokeWidth="1"><path d="M250 130V250L160 360V510" /></g>
        {[[250, 130, "CLIENT"], [250, 250, "API"], [160, 360, "SERVICE"], [160, 510, "DB"]].map(([x, y, label]) => <g key={String(label)} transform={`translate(${x} ${y})`} opacity="0.42"><circle r="4" fill="#6ee7b7" /><text x="10" y="4" fill="#dcebf1" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" letterSpacing="1">{label}</text></g>)}
      </svg>
    </div>
  );
}
