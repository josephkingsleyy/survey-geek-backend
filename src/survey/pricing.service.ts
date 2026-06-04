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

        const audienceConfig =
            PRICING_CONFIG.targetAudience[data.targetAudience as any];

        if (audienceConfig) {
            const tier = audienceConfig.rates.find(r => responses <= r.max);
            price += (tier?.rate || 0) * responses;
        }

        // ------------------------
        // 2. Timeline
        // ------------------------
        price += PRICING_CONFIG.timeline[data.timeline as any] ?? 0;

        // ------------------------
        // 3. Mode of Collection
        // ------------------------
        price += PRICING_CONFIG.modeOfCollection[data.modeOfCollection as any] ?? 0;

        // ------------------------
        // 4. Questions
        // ------------------------
        const questionCount = Number(data.questionNumber || 0);

        const questionTier = PRICING_CONFIG.questionBase.tiers.find(
            t => questionCount <= t.max,
        );

        price += (questionTier?.fee || 0);
        price += questionCount * PRICING_CONFIG.questionBase.perQuestion;

        // ------------------------
        // 5. Support Package
        // ------------------------
        price += PRICING_CONFIG.support[data.support as any] ?? 0;

        return price;
    }
}