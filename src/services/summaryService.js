const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export const summaryService = {
  // Generate a summary from tracking data
  async generateSummary(entryData) {
    // If API key exists, use AI generation
    if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here') {
      return await this.generateAISummary(entryData);
    }

    // Otherwise use template-based summary
    return this.generateTemplateSummary(entryData);
  },

  // Template-based summary (works without API key)
  generateTemplateSummary(data) {
    const parts = [];

    // Mood summary
    if (data.moods && data.moods.length > 0) {
      const moodText = data.moods.join(', ');
      parts.push(`Today you're feeling ${moodText}.`);
    }

    // Energy
    if (data.energyScore) {
      const energyLabels = {
        1: 'very low',
        2: 'low',
        3: 'moderate',
        4: 'good',
        5: 'excellent'
      };
      parts.push(`Your energy is ${energyLabels[data.energyScore]}.`);
    }

    // Cycle
    if (data.cyclePhase) {
      parts.push(`You're in the ${data.cyclePhase} phase of your cycle.`);
    }

    // Habits
    const habitParts = [];
    if (data.waterGlasses > 0) habitParts.push(`${data.waterGlasses} glasses of water`);
    if (data.sleepHours > 0) habitParts.push(`${data.sleepHours} hours of sleep`);
    if (data.meals > 0) habitParts.push(`${data.meals} meals`);
    if (data.movementType) habitParts.push(`${data.movementType} for movement`);

    if (habitParts.length > 0) {
      parts.push(`You tracked: ${habitParts.join(', ')}.`);
    }

    // Reflections
    if (data.proudOf) {
      parts.push(`You're proud of: ${data.proudOf}`);
    }
    if (data.gratefulFor) {
      parts.push(`You're grateful for: ${data.gratefulFor}`);
    }

    const summary = parts.join(' ');

    return {
      summary: summary || "You've logged your day! Keep tracking to unlock deeper insights.",
      isAI: false
    };
  },

  // AI-powered summary using Claude
  async generateAISummary(data) {
    try {
      const prompt = `Based on this daily tracking entry, write a warm, supportive 2-3 sentence summary:

Moods: ${data.moods?.join(', ') || 'not tracked'}
Energy: ${data.energyScore}/5
Cycle Phase: ${data.cyclePhase || 'not tracked'}
Water: ${data.waterGlasses || 0} glasses
Sleep: ${data.sleepHours || 0} hours
Movement: ${data.movementType || 'none'}
Meals: ${data.meals || 0}
Journal: ${data.journal || 'no entry'}
Proud of: ${data.proudOf || 'not shared'}
Grateful for: ${data.gratefulFor || 'not shared'}
Manifestation: ${data.manifestation || 'not shared'}

Write a caring, personalized summary that celebrates their self-care and notes any patterns.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      const result = await response.json();

      if (result.content && result.content[0]) {
        return {
          summary: result.content[0].text,
          isAI: true
        };
      }

      throw new Error('No summary generated');
    } catch (error) {
      console.error('AI summary failed, falling back to template:', error);
      return this.generateTemplateSummary(data);
    }
  }
};
