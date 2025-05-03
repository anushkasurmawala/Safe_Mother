import { MaternalHealthData } from '../types/health';

const ML_API_ENDPOINT = 'https://ai-model-4m93.onrender.com/predict';

export const getPrediction = async (healthData: MaternalHealthData) => {
  try {
    console.log('Sending prediction request with data:', JSON.stringify({
      age: healthData.age,
      systolicBP: healthData.systolicBP,
      diastolic: healthData.diastolicBP,
      bs: healthData.bloodSugar,
      bodyTemp: healthData.bodyTemperature,
      bmi: healthData.bmi,
      prevComplications: healthData.prevComplications ? 1 : 0,
      preexistingDiabetes: healthData.preexistingDiabetes ? 1 : 0,
      gestationalDiabetes: healthData.gestationalDiabetes ? 1 : 0,
      mentalHealth: healthData.mentalHealth,
      heartRate: healthData.heartRate
    }));

    const response = await fetch(ML_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        age: healthData.age || 0,
        systolicBP: healthData.systolicBP || 0,
        diastolic: healthData.diastolicBP || 0,
        bs: healthData.bloodSugar || 0,
        bodyTemp: healthData.bodyTemperature || 0,
        bmi: healthData.bmi || 0,
        prevComplications: healthData.prevComplications ? 1 : 0,
        preexistingDiabetes: healthData.preexistingDiabetes ? 1 : 0,
        gestationalDiabetes: healthData.gestationalDiabetes ? 1 : 0,
        mentalHealth: healthData.mentalHealth || '',
        heartRate: healthData.heartRate || 0
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to get prediction: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log('Prediction result:', result);

    if (!result || typeof result.risk_level === 'undefined') {
      throw new Error('Invalid prediction response format');
    }

    return { risk_level: result.risk_level as 'high' | 'low' };
  } catch (error) {
    console.error('Detailed prediction error:', error);
    // Provide a default prediction if the service fails
    return { risk_level: 'low' };
  }
};
