import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { PRICING_CONFIG } from 'pricing.config';

@Injectable()
export class PricingService {
    calculatePrice(data: CreateSurveyDto): number {
        let price = 0;

        // ------------------------
        // 1. Target Audience
        // ------------------------
        const responses = Number(data.minResponse || 0);

        // Normalize to lowercase so "General" matches "general" in the config
        const audienceKey = (data.targetAudience?.toLowerCase().trim() || 'general') as keyof typeof PRICING_CONFIG.targetResponse;
        const audienceConfig = PRICING_CONFIG.targetResponse[audienceKey];

        if (audienceConfig) {
            const tier = audienceConfig.rates.find(r => responses <= r.max);
            price += (tier?.rate || 0) * responses;
        }

        // ------------------------
        // 2. Timeline
        // ------------------------
        const timelineKey = data.timeline?.toLowerCase().trim() as keyof typeof PRICING_CONFIG.timeline;
        price += PRICING_CONFIG.timeline[timelineKey] ?? 0;

        // ------------------------
        // 3. Mode of Collection
        // ------------------------
        const modeKey = data.modeOfCollection?.toLowerCase().trim() as keyof typeof PRICING_CONFIG.modeOfCollection;
        price += PRICING_CONFIG.modeOfCollection[modeKey] ?? 0;

        // ------------------------
        // 4. Questions
        // Handle plain numbers, ranges like "1-10" (use upper bound), and "40+"
        // ------------------------

        const parseQuestionCount = (value: string | number): number => {
            if (!value) return 0;
            if (typeof value === "number") return value;
            if (value.includes("+")) return Number(value.replace("+", ""));
            if (value.includes("-")) {
                const [, max] = value.split("-");
                return Number(max);
            }
            return Number(value);
        };
        const questionCount = parseQuestionCount(data.questionNumber || 0);

        const questionTier = PRICING_CONFIG.questionBase.tiers.find(
            t => questionCount <= t.max,
        );

        price += (questionTier?.fee || 0);

        // ------------------------
        // 5. Support Package
        // ------------------------
        const supportKey = data.support?.toLowerCase().trim() as keyof typeof PRICING_CONFIG.support;
        price += PRICING_CONFIG.support[supportKey] ?? 0;

        // Round to integer — wallet.points is an Int field in Prisma
        return Math.round(price);
    }
}