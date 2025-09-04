// components/DataCollectorHeldPCB.tsx
'use client'
import React, { useMemo, useState } from 'react'
import { useGetProductionHidingPatterns } from '@/src/hooks/use_analytics'
import type {
    Batch,
    SeverityLevel,
    BatchType,
    SuspiciousPCB,
} from '@/src/types/pcb_held'

const parseDataCollector = (dataCollector: string) => {
    const parts = dataCollector.split('_')
    const line = parts[0]
    const station = parts.slice(1).join('_')
    return { line, station }
}

interface DataCollectorHeldPCBProps {
    // dataCollector: string
    // groupName: string
    lineName: string
}

const severityColor = (sev: SeverityLevel) => {
    switch (sev) {
        case 'LOW':
            return 'bg-emerald-800 text-emerald-200'
        case 'MEDIUM':
            return 'bg-amber-800 text-amber-200'
        case 'HIGH':
            return 'bg-orange-800 text-orange-200'
        case 'CRITICAL':
            return 'bg-rose-800 text-rose-200'
        default:
            return 'bg-neutral-700 text-neutral-200'
    }
}

const batchTypeColor = (type: BatchType) => {
    switch (type) {
        case 'RAPID_BATCH':
            return 'bg-sky-800 text-sky-200'
        case 'BURST_RELEASE':
            return 'bg-fuchsia-800 text-fuchsia-200'
        default:
            return 'bg-neutral-700 text-neutral-200'
    }
}

const fmtPercent = (n: number | undefined) =>
    typeof n === 'number' ? `${n.toFixed(1)}%` : '—'
const fmtHours = (n: number | undefined) =>
    typeof n === 'number' ? `${n.toFixed(2)} h` : '—'
const fmtMinutes = (n: number | undefined) =>
    typeof n === 'number' ? `${n.toFixed(0)} min` : '—'
const fmtSeconds = (n: number | undefined) =>
    typeof n === 'number' ? `${n.toFixed(0)} s` : '—'

const StatCard = ({
    title,
    value,
    hint,
}: {
    title: string
    value: React.ReactNode
    hint?: string
}) => (
    <div className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-3 shadow-lg hover:bg-neutral-700/30 transition-colors">
        <p className="text-stone-400 text-xs uppercase tracking-wide">
            {title}
        </p>
        <div className="flex items-end gap-2">
            <p className="text-stone-100 text-xl font-bold">{value}</p>
            {hint && (
                <span className="text-stone-400 text-[11px] mb-[2px]">
                    {hint}
                </span>
            )}
        </div>
    </div>
)

const Pill = ({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) => (
    <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${className}`}
    >
        {children}
    </span>
)

const Section = ({
    title,
    right,
    children,
}: {
    title: string
    right?: React.ReactNode
    children: React.ReactNode
}) => (
    <div className="w-full">
        <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-stone-300">{title}</h4>
            {right}
        </div>
        <div>{children}</div>
    </div>
)

// Lightweight modal for listing suspicious PCBs within a batch
const BatchSuspiciousModal = ({
    open,
    onClose,
    batch,
    suspiciousInBatch,
}: {
    open: boolean
    onClose: () => void
    batch: Batch | null
    suspiciousInBatch: SuspiciousPCB[]
}) => {
    if (!open || !batch) return null
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-neutral-900 text-stone-100 border border-neutral-700 rounded-lg w-[820px] max-w-[95vw] max-h-[85vh] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-3 border-b border-neutral-800">
                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold">
                            Suspicious PCBs • Batch {batch.batch_id}
                        </h4>
                        <p className="text-xs text-stone-400">
                            {batch.pcb_count} PCBs • Evidence{' '}
                            {batch.batch_characteristics.hiding_evidence_score.toFixed(
                                2
                            )}{' '}
                            • Holding{' '}
                            {fmtHours(
                                batch.timing_analysis.holding_period
                                    .duration_hours
                            )}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-stone-300 hover:text-white px-2 py-1 rounded-md"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-3 overflow-y-auto max-h-[70vh]">
                    <div className="bg-neutral-950/40 border border-neutral-800 rounded-md">
                        <div className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr_auto] gap-2 px-2 py-2 text-[11px] uppercase tracking-wide text-stone-400">
                            <div>PPID</div>
                            <div>Final Inspect</div>
                            <div>Packing Time</div>
                            <div>Delay</div>
                            <div>Severity</div>
                        </div>
                        <div className="divide-y divide-neutral-800">
                            {suspiciousInBatch.length === 0 ? (
                                <div className="px-2 py-3 text-stone-400 text-sm">
                                    No suspicious PCBs in this batch
                                </div>
                            ) : (
                                suspiciousInBatch
                                    .sort(
                                        (a, b) => b.delay_hours - a.delay_hours
                                    )
                                    .map((pcb) => (
                                        <div
                                            key={pcb.ppid}
                                            className="grid grid-cols-[1.6fr_1fr_1fr_1.5fr_1] items-center gap-2 px-2 py-2 hover:bg-neutral-800/40"
                                        >
                                            <div className="text-stone-200 font-mono text-sm truncate">
                                                {pcb.ppid}
                                            </div>
                                            <div className="text-stone-300 font-mono text-xs">
                                                {pcb.final_inspect_time}
                                            </div>
                                            <div className="text-stone-300 font-mono text-xs">
                                                {pcb.packing_time}
                                            </div>
                                            <div className="border text-stone-100">
                                                {fmtHours(pcb.delay_hours)}{' '}
                                                <span className="text-stone-400 text-xs">
                                                    (
                                                    {fmtMinutes(
                                                        pcb.delay_minutes
                                                    )}
                                                    )
                                                </span>
                                            </div>
                                            <div className="justify-self-end">
                                                <Pill
                                                    className={severityColor(
                                                        pcb.severity
                                                    )}
                                                >
                                                    {pcb.severity}
                                                </Pill>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-3 border-t border-neutral-800 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-neutral-800 hover:bg-neutral-700 text-stone-200 px-3 py-1.5 rounded-md text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

const DataCollectorHeldPCB = ({ lineName }: DataCollectorHeldPCBProps) => {
    // const { line } = parseDataCollector(dataCollector)
    const { data, isLoading, isError, error } =
        useGetProductionHidingPatterns(lineName)

    // Selected batch to show in popup
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    // Fast lookup map for suspicious PCBs by PPID
    const suspiciousById = useMemo(() => {
        const map = new Map<string, SuspiciousPCB>()
        if (data?.suspicious_pcbs?.length) {
            for (const pcb of data.suspicious_pcbs) map.set(pcb.ppid, pcb)
        }
        return map
    }, [data])

    const topSuspicious: SuspiciousPCB[] = useMemo(() => {
        if (!data?.suspicious_pcbs) return []
        return [...data.suspicious_pcbs]
            .sort((a, b) => b.delay_hours - a.delay_hours)
            .slice(0, 8)
    }, [data])

    const topBatches: Batch[] = useMemo(() => {
        const batches = data?.detected_patterns?.batch_hiding_patterns?.batches
        if (!batches) return []
        return [...batches]
            .sort(
                (a, b) =>
                    b.batch_characteristics.hiding_evidence_score -
                    a.batch_characteristics.hiding_evidence_score
            )
            .slice(0, 5)
    }, [data])

    // Derive suspicious PCBs for the currently selected batch
    const suspiciousInSelectedBatch: SuspiciousPCB[] = useMemo(() => {
        if (!selectedBatch) return []
        return selectedBatch.pcbs
            .map((ppid) => suspiciousById.get(ppid))
            .filter(Boolean) as SuspiciousPCB[]
    }, [selectedBatch, suspiciousById])

    if (isLoading) return <div>Loading PCB analysis...</div>
    if (isError) return <div>Error: {error?.message}</div>
    if (!data) return <div>No PCB analysis data</div>

    const stats = data.statistics
    const patterns = data.detected_patterns
    const batchesAgg = patterns.batch_hiding_patterns
    const sev = patterns.severity_breakdown

    return (
        <div className="w-full h-full flex flex-col px-1 overflow-y-auto">
            {/* Header */}
            <div className="w-full h-fit mb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-stone-300">
                            Held PCBs Dashboard
                        </h3>
                        <p className="text-stone-400 text-xs">
                            Line {data.line_name} • Analyzed at{' '}
                            <span className="font-mono">
                                {data.analysis_timestamp}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Pill
                            className={
                                patterns.pattern_detected
                                    ? 'bg-rose-800 text-rose-200'
                                    : 'bg-emerald-800 text-emerald-200'
                            }
                        >
                            {patterns.pattern_detected
                                ? 'Patterns Detected'
                                : 'No Patterns'}
                        </Pill>
                        <Pill className="bg-neutral-800 text-neutral-200">
                            Threshold {fmtMinutes(stats.threshold_minutes)}
                        </Pill>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
                <StatCard
                    title="Total PCBs"
                    value={stats.total_pcbs.toLocaleString()}
                />
                <StatCard
                    title="Suspicious"
                    value={stats.suspicious_count.toLocaleString()}
                    hint={`${fmtPercent(stats.suspicious_percentage)}`}
                />
                <StatCard
                    title="Normal"
                    value={stats.normal_count.toLocaleString()}
                />
                <StatCard
                    title="Avg Delay"
                    value={fmtMinutes(stats.avg_delay_minutes)}
                />
                <StatCard
                    title="Max Delay"
                    value={fmtHours(stats.max_delay_hours)}
                />
                <StatCard
                    title="Min Delay"
                    value={fmtSeconds(stats.min_delay_seconds)}
                />
            </div>

            {/* Severity + Packing Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                <Section
                    title="Severity Breakdown"
                    right={
                        <Pill className="bg-neutral-800 text-neutral-200">
                            Total {patterns.total_suspicious}
                        </Pill>
                    }
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(
                            [
                                'LOW',
                                'MEDIUM',
                                'HIGH',
                                'CRITICAL',
                            ] as SeverityLevel[]
                        ).map((level) => (
                            <div
                                key={level}
                                className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-2"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-stone-400 text-xs uppercase">
                                        {level}
                                    </span>
                                    <Pill className={severityColor(level)}>
                                        {level}
                                    </Pill>
                                </div>
                                <p className="text-stone-100 text-lg font-bold mt-1">
                                    {sev[level]?.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Most Common Packing Hours">
                    <div className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-2">
                        {patterns.most_common_packing_hours.length === 0 ? (
                            <p className="text-stone-400 text-sm">No data</p>
                        ) : (
                            <div className="space-y-1">
                                {patterns.most_common_packing_hours
                                    .slice(0, 6)
                                    .map(([hour, count]) => (
                                        <div
                                            key={`${hour}-${count}`}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-16 text-stone-300 text-xs font-mono">
                                                {`${hour.toString().padStart(2, '0')}:00`}
                                            </div>
                                            <div className="flex-1 h-2 bg-neutral-800 rounded">
                                                <div
                                                    className="h-2 bg-sky-600 rounded"
                                                    style={{
                                                        width: `${
                                                            Math.min(
                                                                100,
                                                                (count /
                                                                    (patterns.total_suspicious ||
                                                                        1)) *
                                                                    100
                                                            ) || 0
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                            <div className="w-10 text-right text-stone-300 text-xs">
                                                {count}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </Section>
            </div>

            {/* Batch Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                <div className="col-span-1">
                    <Section
                        title="Batch Detection"
                        right={
                            <Pill
                                className={
                                    batchesAgg.batch_detected
                                        ? 'bg-amber-800 text-amber-200'
                                        : 'bg-neutral-800 text-neutral-200'
                                }
                            >
                                {batchesAgg.batch_detected
                                    ? `${batchesAgg.total_batches} batches`
                                    : 'No batches'}
                            </Pill>
                        }
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <StatCard
                                title="In Batches"
                                value={batchesAgg.batch_statistics.total_pcbs_in_batches.toLocaleString()}
                                hint={fmtPercent(
                                    batchesAgg.batch_statistics
                                        .percentage_in_batches
                                )}
                            />
                            <StatCard
                                title="Avg Batch Size"
                                value={batchesAgg.batch_statistics.batch_size_stats.avg_batch_size.toFixed(
                                    1
                                )}
                                hint={`Max ${batchesAgg.batch_statistics.batch_size_stats.largest_batch_size}, Min ${batchesAgg.batch_statistics.batch_size_stats.smallest_batch_size}`}
                            />
                            <StatCard
                                title="Avg Holding"
                                value={fmtHours(
                                    batchesAgg.batch_statistics.timing_stats
                                        .avg_holding_hours
                                )}
                                hint={`Max ${fmtHours(
                                    batchesAgg.batch_statistics.timing_stats
                                        .max_holding_hours
                                )}`}
                            />
                            <StatCard
                                title="High Evidence Batches"
                                value={batchesAgg.batch_statistics.hiding_evidence_stats.high_evidence_batches.toLocaleString()}
                                hint={`Max score ${batchesAgg.batch_statistics.hiding_evidence_stats.max_hiding_score.toFixed(
                                    2
                                )}`}
                            />
                        </div>
                    </Section>
                </div>

                <div className="col-span-2">
                    <Section
                        title="Top Batches by Hiding Evidence"
                        right={
                            <Pill className="bg-neutral-800 text-neutral-200">
                                Showing {topBatches.length}
                            </Pill>
                        }
                    >
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2">
                            {topBatches.length === 0 && (
                                <div className="text-stone-400 text-sm">
                                    No batch data
                                </div>
                            )}
                            {topBatches.map((b) => (
                                <div
                                    key={b.batch_id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        setSelectedBatch(b)
                                        setModalOpen(true)
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            e.preventDefault()
                                            setSelectedBatch(b)
                                            setModalOpen(true)
                                        }
                                    }}
                                    className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-2 transition-colors cursor-pointer hover:bg-neutral-700/30"
                                >
                                    <div className="flex  items-start justify-between gap-2">
                                        <div>
                                            <p className="text-stone-400 text-[11px] uppercase tracking-wide">
                                                Batch
                                            </p>
                                        </div>
                                        <Pill
                                            className={batchTypeColor(
                                                b.batch_characteristics
                                                    .batch_type
                                            )}
                                        >
                                            {b.batch_characteristics.batch_type}
                                        </Pill>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-stone-400 text-[11px] uppercase">
                                                Size
                                            </p>
                                            <p className="text-stone-100 font-semibold">
                                                {b.pcb_count}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-stone-400 text-[11px] uppercase">
                                                Evidence
                                            </p>
                                            <p className="text-stone-100 font-semibold">
                                                {b.batch_characteristics.hiding_evidence_score.toFixed(
                                                    2
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-stone-400 text-[11px] uppercase">
                                                Avg Delay
                                            </p>
                                            <p className="text-stone-100">
                                                {fmtHours(
                                                    b.delay_statistics
                                                        .avg_delay_hours
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-stone-400 text-[11px] uppercase">
                                                Delay Range
                                            </p>
                                            <p className="text-stone-100">
                                                {fmtHours(
                                                    b.delay_statistics
                                                        .min_delay_hours
                                                )}{' '}
                                                -{' '}
                                                {fmtHours(
                                                    b.delay_statistics
                                                        .max_delay_hours
                                                )}
                                            </p>
                                        </div>

                                        <div className="col-span-2">
                                            <p className="text-stone-400 text-[11px] uppercase">
                                                Holding
                                            </p>
                                            <p className="text-stone-100">
                                                {fmtHours(
                                                    b.timing_analysis
                                                        .holding_period
                                                        .duration_hours
                                                )}{' '}
                                                • Span{' '}
                                                {fmtHours(
                                                    b.timing_analysis
                                                        .total_span_hours
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>

            {/* Suspicious PCBs */}
            <Section
                title="Top Suspicious PCBs"
                right={
                    <Pill className="bg-neutral-800 text-neutral-200">
                        {topSuspicious.length} shown
                    </Pill>
                }
            >
                <div className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 px-2 py-2 text-[11px] uppercase tracking-wide text-stone-400">
                        <div>PPID</div>
                        <div>Delay</div>
                        <div>Status</div>
                        <div>Severity</div>
                    </div>
                    <div className="divide-y divide-neutral-800">
                        {topSuspicious.length === 0 && (
                            <div className="px-2 py-3 text-stone-400 text-sm">
                                No suspicious PCBs
                            </div>
                        )}
                        {topSuspicious.map((pcb) => (
                            <div
                                key={pcb.ppid}
                                className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 px-2 py-2 hover:bg-neutral-700/30 transition-colors"
                            >
                                <div className="text-stone-200 font-mono">
                                    {pcb.ppid}
                                </div>
                                <div className="text-stone-100">
                                    {fmtHours(pcb.delay_hours)}{' '}
                                    <span className="text-stone-400 text-xs">
                                        ({fmtMinutes(pcb.delay_minutes)})
                                    </span>
                                </div>
                                <div>
                                    <Pill
                                        className={
                                            pcb.status === 'SUSPICIOUS'
                                                ? 'bg-rose-800 text-rose-200'
                                                : 'bg-emerald-800 text-emerald-200'
                                        }
                                    >
                                        {pcb.status}
                                    </Pill>
                                </div>
                                <div>
                                    <Pill
                                        className={severityColor(pcb.severity)}
                                    >
                                        {pcb.severity}
                                    </Pill>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Recommendations */}
            <div className="mt-3">
                <Section title="Recommendations">
                    <div className="bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-3">
                        {data.recommendations.length === 0 ? (
                            <p className="text-stone-400 text-sm">No items</p>
                        ) : (
                            <ul className="list-disc pl-5 space-y-1 text-stone-200 text-sm">
                                {data.recommendations.map((rec, idx) => (
                                    <li key={idx}>{rec}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Section>
            </div>

            {/* Modal */}
            <BatchSuspiciousModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                batch={selectedBatch}
                suspiciousInBatch={suspiciousInSelectedBatch}
            />
        </div>
    )
}

export default DataCollectorHeldPCB
