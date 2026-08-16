"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitectureConnection } from "@/components/background/ArchitectureConnection";
import { ArchitectureNode } from "@/components/background/ArchitectureNode";
import { DataPacket } from "@/components/background/DataPacket";
import { mobilePipelines } from "@/data/architectures";
import type { ArchitectureModel } from "@/types/architecture";

gsap.registerPlugin(ScrollTrigger);

interface ArchitectureSceneProps {
  architecture: ArchitectureModel;
  mobilePipeline?: { path: string; nodes: [number, number, string][] };
  className?: string;
}

export function ArchitectureScene({
  architecture,
  mobilePipeline: customMobilePipeline,
  className = "",
}: ArchitectureSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRectRefs = useRef<Map<string, SVGRectElement>>(new Map());
  const nodeStatusRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const connectionRefs = useRef<Map<string, SVGLineElement>>(new Map());
  const packetRefs = useRef<Map<string, SVGCircleElement>>(new Map());

  const packetTimeline = useRef<gsap.core.Timeline | null>(null);
  const canAnimate = useRef(false);
  const isVisible = useRef(architecture.state === "hero");

  const mobilePipeline =
    customMobilePipeline || mobilePipelines[architecture.state];

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(min-width: 640px) and (prefers-reduced-motion: no-preference)",
    );

    const pulseNode = (nodeId: string, connId?: string) => {
      const rect = nodeRectRefs.current.get(nodeId);
      const status = nodeStatusRefs.current.get(nodeId);
      if (rect) {
        gsap.to(rect, {
          strokeOpacity: 0.95,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
      }
      if (status) {
        gsap.to(status, {
          opacity: 1,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
        });
      }
      if (connId) {
        const conn = connectionRefs.current.get(connId);
        if (conn) {
          gsap.to(conn, {
            strokeOpacity: 0.78,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
          });
        }
      }
    };

    const runPackets = () => {
      packetTimeline.current?.kill();
      packetTimeline.current = null;
      if (!canAnimate.current || !isVisible.current) return;

      const { packets, nodes, connections } = architecture;
      if (!packets || packets.length === 0) return;

      const request = packets[0];
      const response = packets[1];

      const requestPacket = packetRefs.current.get("req");
      const responsePacket = packetRefs.current.get("resp");
      if (!requestPacket) return;

      const getNodePos = (id: string) =>
        nodes.find((n) => n.id === id)?.position;

      const findConnId = (fromId: string, toId: string) =>
        connections.find(
          (c) =>
            (c.from === fromId && c.to === toId) ||
            (c.from === toId && c.to === fromId),
        )?.id;

      const reqStartPos = request ? getNodePos(request.route[0]) : undefined;
      if (!reqStartPos) return;

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

      // Request packet
      timeline.set(requestPacket, {
        attr: { cx: reqStartPos.x, cy: reqStartPos.y },
        opacity: 0.95,
      });

      request.route.slice(1).forEach((nodeId, i) => {
        const prevId = request.route[i];
        const target = getNodePos(nodeId);
        const connId = findConnId(prevId, nodeId);
        if (!target) return;

        timeline.to(requestPacket, {
          attr: { cx: target.x, cy: target.y },
          duration: 0.5,
          ease: "power1.inOut",
          onStart: () => {
            pulseNode(nodeId, connId);
          },
        });
      });

      timeline.to(requestPacket, { opacity: 0, duration: 0.14 });

      // Response packet (if present)
      if (response && responsePacket && response.route.length > 0) {
        const respStartPos = getNodePos(response.route[0]);
        if (respStartPos) {
          timeline.set(
            responsePacket,
            {
              attr: { cx: respStartPos.x, cy: respStartPos.y },
              opacity: 0.9,
            },
            "+=0.18",
          );

          response.route.slice(1).forEach((nodeId, i) => {
            const prevId = response.route[i];
            const target = getNodePos(nodeId);
            const connId = findConnId(prevId, nodeId);
            if (!target) return;

            timeline.to(responsePacket, {
              attr: { cx: target.x, cy: target.y },
              duration: 0.5,
              ease: "power1.inOut",
              onStart: () => {
                pulseNode(nodeId, connId);
              },
            });
          });

          timeline.to(responsePacket, { opacity: 0, duration: 0.14 });
        }
      }

      packetTimeline.current = timeline;
    };

    const stopPackets = () => {
      packetTimeline.current?.kill();
      packetTimeline.current = null;
      const req = packetRefs.current.get("req");
      const resp = packetRefs.current.get("resp");
      if (req) req.setAttribute("opacity", "0");
      if (resp) resp.setAttribute("opacity", "0");
    };

    const updateMotion = () => {
      canAnimate.current = motionQuery.matches;
      if (isVisible.current) {
        runPackets();
      } else {
        stopPackets();
      }
    };

    updateMotion();
    motionQuery.addEventListener("change", updateMotion);

    // Attach ScrollTrigger to parent section
    const sectionElement = containerRef.current?.closest("section");
    let trigger: ScrollTrigger | null = null;

    if (sectionElement) {
      trigger = ScrollTrigger.create({
        trigger: sectionElement,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          isVisible.current = true;
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          runPackets();
        },
        onLeave: () => {
          isVisible.current = false;
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
          stopPackets();
        },
        onEnterBack: () => {
          isVisible.current = true;
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          runPackets();
        },
        onLeaveBack: () => {
          if (architecture.state !== "hero") {
            isVisible.current = false;
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.35,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
            stopPackets();
          }
        },
      });
    }

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      trigger?.kill();
      stopPackets();
    };
  }, [architecture]);

  const getNodePos = (id: string) =>
    architecture.nodes.find((n) => n.id === id)?.position || {
      x: 740,
      y: 350,
    };

  const isHero = architecture.state === "hero";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ opacity: isHero ? 1 : 0 }}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden [transform:perspective(1200px)_rotateX(1deg)_translateZ(0)] ${className}`}
    >
      {/* Desktop SVG Scene */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        className="hidden h-full w-full sm:block"
      >
        {/* Connections layer */}
        <g opacity="1">
          {architecture.connections.map((conn) => {
            const from = getNodePos(conn.from);
            const to = getNodePos(conn.to);
            return (
              <ArchitectureConnection
                key={conn.id}
                id={conn.id}
                from={from}
                to={to}
                opacity={0.42}
                lineRef={(el) => {
                  if (el) connectionRefs.current.set(conn.id, el);
                  else connectionRefs.current.delete(conn.id);
                }}
              />
            );
          })}
        </g>

        {/* Nodes layer */}
        <g>
          {architecture.nodes.map((node) => (
            <ArchitectureNode
              key={node.id}
              node={node}
              groupRef={() => {}}
              rectRef={(el) => {
                if (el) nodeRectRefs.current.set(node.id, el);
                else nodeRectRefs.current.delete(node.id);
              }}
              lineRef={() => {}}
              statusRef={(el) => {
                if (el) nodeStatusRefs.current.set(node.id, el);
                else nodeStatusRefs.current.delete(node.id);
              }}
              labelRef={() => {}}
            />
          ))}
        </g>

        {/* Data Packets layer */}
        <g>
          {architecture.packets[0] && (
            <DataPacket
              packetRef={(el) => {
                if (el) packetRefs.current.set("req", el);
                else packetRefs.current.delete("req");
              }}
              x={getNodePos(architecture.packets[0].route[0]).x}
              y={getNodePos(architecture.packets[0].route[0]).y}
              fill="#67e8f9"
            />
          )}
          {architecture.packets[1] && (
            <DataPacket
              packetRef={(el) => {
                if (el) packetRefs.current.set("resp", el);
                else packetRefs.current.delete("resp");
              }}
              x={getNodePos(architecture.packets[1].route[0]).x}
              y={getNodePos(architecture.packets[1].route[0]).y}
              fill="#6ee7b7"
            />
          )}
        </g>
      </svg>

      {/* Mobile Simplified SVG Scene */}
      {mobilePipeline && (
        <svg
          aria-hidden="true"
          viewBox="0 0 320 520"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full sm:hidden"
        >
          <path
            d={mobilePipeline.path}
            fill="none"
            stroke="#67e8f9"
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          {mobilePipeline.nodes.map(([x, y, label]) => (
            <g key={label} transform={`translate(${x} ${y})`} opacity="0.55">
              <circle r="3.5" fill="#6ee7b7" opacity="0.9" />
              <text
                x="10"
                y="4"
                fill="#eef5f8"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontSize="10"
                letterSpacing="1"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
