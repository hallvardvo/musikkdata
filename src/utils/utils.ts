export const parseSkipTimes = (input: any): number[] => {
  try {
    if (Array.isArray(input)) return input.map(Number).filter(t => !isNaN(t));
    if (typeof input === 'string') return input.split(',').map(Number);
    return [];
  } catch (error) {
    console.error('Error parsing skip times:', error);
    return [];
  }
};
