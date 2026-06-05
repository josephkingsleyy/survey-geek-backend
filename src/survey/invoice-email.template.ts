import { PRICING_CONFIG } from 'pricing.config';
import { CreateSurveyDto } from './dto/create-survey.dto';

export interface InvoiceLineItem {
  label: string;
  detail: string;
  amount: number;
}

export function buildInvoiceLineItems(data: CreateSurveyDto): InvoiceLineItem[] {
  const items: InvoiceLineItem[] = [];

  // 1. Target Audience — normalize to lowercase so "General" matches "general" in config
  const responses = Number(data.minResponse || 0);
  const audienceKey = (data.targetAudience?.toLowerCase().trim() || 'general') as keyof typeof PRICING_CONFIG.targetResponse;
  const audienceConfig = PRICING_CONFIG.targetResponse[audienceKey];

  if (audienceConfig) {
    const tier = audienceConfig.rates.find((r) => responses <= r.max);
    const audienceCost = (tier?.rate || 0) * responses;
    if (audienceCost > 0) {
      items.push({
        label: 'Target Audience',
        detail: `${data.targetAudience} × ${responses} responses @ ${tier?.rate ?? 0} /response`,
        amount: audienceCost,
      });
    }
  }

  // 2. Timeline
  const timelineCost =
    PRICING_CONFIG.timeline[data.timeline as keyof typeof PRICING_CONFIG.timeline] ?? 0;
  if (timelineCost > 0) {
    items.push({
      label: 'Timeline',
      detail: `${data.timeline}`,
      amount: timelineCost,
    });
  }

  // 3. Mode of Collection
  const modeCost =
    PRICING_CONFIG.modeOfCollection[data.modeOfCollection as keyof typeof PRICING_CONFIG.modeOfCollection] ?? 0;
  if (modeCost > 0) {
    items.push({
      label: 'Mode of Collection',
      detail: `${data.modeOfCollection}`,
      amount: modeCost,
    });
  }

  // 4. Questions — flat tier fee based on count
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
  const questionCount = parseQuestionCount(data.questionNumber as any);
  const questionTier = PRICING_CONFIG.questionBase.tiers.find((t) => questionCount <= t.max);
  const questionTotal = questionTier?.fee || 0;
  if (questionTotal > 0) {
    items.push({
      label: 'Questions',
      detail: `${questionCount} question${questionCount !== 1 ? 's' : ''} (${questionCount <= 10 ? '1–10' : questionCount <= 20 ? '11–20' : questionCount <= 40 ? '21–40' : '40+'} tier)`,
      amount: questionTotal,
    });
  }

  // 5. Support Package
  const supportCost =
    PRICING_CONFIG.support[data.support as keyof typeof PRICING_CONFIG.support] ?? 0;
  if (supportCost > 0) {
    items.push({
      label: 'Support Package',
      detail: `${data.support}`,
      amount: supportCost,
    });
  }

  return items;
}

export function buildInvoiceEmail(params: {
  surveyTitle: string;
  surveyId: string | number;
  userEmail: string;
  lineItems: InvoiceLineItem[];
  total: number;
  date?: Date;
}): string {
  const { surveyTitle, surveyId, lineItems, total, date = new Date() } = params;

  const formattedDate = date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const invoiceNumber = `INV-${Date.now()}`;

  const rows = lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px; border-bottom:1px solid #eee; color:#374151;">
          <strong style="display:block; color:#111827;">${item.label}</strong>
          <span style="font-size:12px; color:#6B7280;">${item.detail}</span>
        </td>
        <td style="padding:10px 12px; border-bottom:1px solid #eee; text-align:right; color:#111827; white-space:nowrap;">
          ${item.amount.toLocaleString()}
        </td>
      </tr>`,
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Invoice – ${invoiceNumber}</title>
</head>
<body style="margin:0; padding:0; background:#F3F4F6; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.08); max-width:600px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#4a6741; padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.3px;">SurveyGeek</span>
                  </td>
                  <td align="right">
                    <span style="color:#d1e8cc; font-size:13px;">INVOICE</span><br/>
                    <span style="color:#ffffff; font-size:15px; font-weight:600;">${invoiceNumber}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Meta -->
          <tr>
            <td style="padding:24px 40px 0; border-bottom:1px solid #E5E7EB;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <span style="font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px;">Date</span><br/>
                    <span style="font-size:14px; color:#374151;">${formattedDate}</span>
                  </td>
                  <td style="padding-bottom:20px;">
                    <span style="font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px;">Survey ID</span><br/>
                    <span style="font-size:14px; color:#374151;">#${surveyId}</span>
                  </td>
                  <td style="padding-bottom:20px;" align="right">
                    <span style="font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px;">Status</span><br/>
                    <span style="display:inline-block; background:#dcfce7; color:#15803d; font-size:12px; font-weight:600; padding:2px 10px; border-radius:99px;">PAID</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Survey title -->
          <tr>
            <td style="padding:20px 40px; background:#f9fafb; border-bottom:1px solid #E5E7EB;">
              <span style="font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px;">Survey</span><br/>
              <span style="font-size:16px; font-weight:600; color:#111827;">${surveyTitle}</span>
            </td>
          </tr>

          <!-- Line items -->
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                <tr style="background:#F9FAFB;">
                  <th style="padding:10px 12px; text-align:left; font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px; font-weight:600; border-bottom:2px solid #E5E7EB;">Item</th>
                  <th style="padding:10px 12px; text-align:right; font-size:11px; text-transform:uppercase; color:#9CA3AF; letter-spacing:0.5px; font-weight:600; border-bottom:2px solid #E5E7EB;">Amount</th>
                </tr>
                ${rows}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 12px 0;" align="right">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 24px 8px 0; font-size:14px; color:#6B7280;">Subtotal</td>
                        <td style="padding:8px 0; font-size:14px; color:#374151; text-align:right;">${total.toLocaleString()} </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:2px solid #111827; padding-top:8px;"></td>
                      </tr>
                      <tr>
                        <td style="padding:8px 24px 0 0; font-size:16px; font-weight:700; color:#111827;">Total Deducted</td>
                        <td style="padding:8px 0 0; font-size:16px; font-weight:700; color:#4a6741; text-align:right;">${total.toLocaleString()} </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9FAFB; padding:20px 40px; border-top:1px solid #E5E7EB; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9CA3AF;">
                This is an automated invoice from SurveyGeek. Points are non-refundable once a survey is created.
              </p>
              <p style="margin:8px 0 0; font-size:12px; color:#9CA3AF;">
                Need help? Contact <a href="mailto:support@surveygeek.com" style="color:#4a6741;">support@surveygeek.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}