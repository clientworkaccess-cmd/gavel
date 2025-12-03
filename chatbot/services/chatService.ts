import { WebhookResponse } from '../types';

export const sendMessageToWebhook = async (
  message: string,
  sessionId: string,
  webhookUrl: string,
  role: string
): Promise<WebhookResponse> => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        role,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Read response as text first to handle cases where n8n returns raw string instead of JSON
    const text = await response.text();
    
    try {
      // Try parsing as JSON
      const data = JSON.parse(text);
      return data;
    } catch (e) {
      return {
        output: text
      };
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};