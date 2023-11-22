
/**

The `convertObjectToArray` function takes an input object containing
nested objects and converts each inner object with numeric keys into an array.
 The purpose is to transform nested structures where numeric keys (e.g., 0, 1, ...)
 are used as properties into an array format.
 */

export const convertObjectToArray = (inputObject: any) =>
{
    return Object.keys(inputObject).map(key =>
    {
        const value = inputObject[ key ];

        if (typeof value === 'object' && value !== null) {
            // Check if the value has a property named "achievements" with numeric keys
            const hasAchievements = value.achievements && /^\d+$/.test(Object.keys(value.achievements)[ 0 ]);

            if (hasAchievements) {
                // If "achievements" has numeric keys, convert it to an array
                return {
                    ...value,
                    achievements: Object.keys(value.achievements).map(innerKey => value.achievements[ innerKey ])
                };
            }
        }

        // Otherwise, include the value directly in the array
        return value;
    });
};
