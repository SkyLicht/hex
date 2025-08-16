// Base types for PCB analysis
export interface PCBAnalysisResponse {
    line_name: string
    analysis_timestamp: string
    statistics: PCBStatistics
    suspicious_pcbs: SuspiciousPCB[]
    detected_patterns: DetectedPatterns
    recommendations: string[]
}

// Statistics interface
export interface PCBStatistics {
    total_pcbs: number
    suspicious_count: number
    normal_count: number
    suspicious_percentage: number
    avg_delay_minutes: number
    max_delay_hours: number
    min_delay_seconds: number
    threshold_minutes: number
}

// Suspicious PCB interface
export interface SuspiciousPCB {
    ppid: string
    final_inspect_time: string
    packing_time: string
    delay_seconds: number
    delay_minutes: number
    delay_hours: number
    status: PCBStatus
    severity: SeverityLevel
}

// Detected patterns interface
export interface DetectedPatterns {
    pattern_detected: boolean
    severity_breakdown: SeverityBreakdown
    most_common_packing_hours: Array<[number, number]>
    total_suspicious: number
    longest_delay_hours: number
    batch_hiding_patterns: BatchHidingPatterns
}

// Severity breakdown
export interface SeverityBreakdown {
    LOW: number
    MEDIUM: number
    CRITICAL: number
    HIGH: number
}

// Batch hiding patterns
export interface BatchHidingPatterns {
    batch_detected: boolean
    total_batches: number
    detection_methods: DetectionMethods
    batches: Batch[]
    batch_statistics: BatchStatistics
    hiding_patterns: HidingPatterns
    analysis_parameters: AnalysisParameters
}

// Detection methods
export interface DetectionMethods {
    packing_clusters: number
    inspection_clusters: number
    combined_patterns: number
}

// Batch interface
export interface Batch {
    batch_id: string
    pcb_count: number
    pcbs: string[]
    timing_analysis: TimingAnalysis
    delay_statistics: DelayStatistics
    batch_characteristics: BatchCharacteristics
}

// Timing analysis
export interface TimingAnalysis {
    inspection_period: TimePeriod
    packing_period: TimePeriod
    holding_period: HoldingPeriod
    total_span_hours: number
}

// Time period
export interface TimePeriod {
    start_time: string
    end_time: string
    duration_minutes: number
}

// Holding period
export interface HoldingPeriod {
    duration_minutes: number
    duration_hours: number
}

// Delay statistics
export interface DelayStatistics {
    avg_delay_hours: number
    min_delay_hours: number
    max_delay_hours: number
    delay_std_minutes: number
    uniformity_score: number
}

// Batch characteristics
export interface BatchCharacteristics {
    hiding_evidence_score: number
    batch_type: BatchType
    severity_distribution: Record<SeverityLevel, number>
}

// Batch statistics
export interface BatchStatistics {
    total_pcbs_in_batches: number
    percentage_in_batches: number
    batch_size_stats: BatchSizeStats
    hiding_evidence_stats: HidingEvidenceStats
    timing_stats: TimingStats
    batch_type_distribution: Record<BatchType, number>
}

// Batch size statistics
export interface BatchSizeStats {
    avg_batch_size: number
    largest_batch_size: number
    smallest_batch_size: number
}

// Hiding evidence statistics
export interface HidingEvidenceStats {
    avg_hiding_score: number
    max_hiding_score: number
    high_evidence_batches: number
}

// Timing statistics
export interface TimingStats {
    avg_holding_hours: number
    max_holding_hours: number
    min_holding_hours: number
}

// Hiding patterns
export interface HidingPatterns {
    patterns: HidingPattern[]
    total_pattern_count: number
    max_severity: SeverityLevel
}

// Individual hiding pattern
export interface HidingPattern {
    pattern: PatternType
    description: string
    severity: SeverityLevel
}

// Analysis parameters
export interface AnalysisParameters {
    time_window_minutes: number
    min_batch_size: number
}

// Enums for type safety
export type PCBStatus = 'SUSPICIOUS' | 'NORMAL'

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type BatchType = 'RAPID_BATCH' | 'BURST_RELEASE'

export type PatternType = 'SYSTEMATIC_BURST_RELEASE'

// Utility types for working with the data
export type PCBAnalysisSummary = Pick<
    PCBAnalysisResponse,
    'line_name' | 'analysis_timestamp' | 'statistics'
>

export type BatchSummary = Pick<
    Batch,
    'batch_id' | 'pcb_count' | 'batch_characteristics'
>

export type SuspiciousPCBSummary = Pick<
    SuspiciousPCB,
    'ppid' | 'delay_hours' | 'severity'
>
