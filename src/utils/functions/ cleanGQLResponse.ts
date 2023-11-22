/**
 * This function removes __typename from graql responses
 * @param obj
 * @returns
 */
export function cleangqlResponse(obj: any): any
{
    if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        for (const key in obj) {
            if (key !== '__typename') {
                newObj[ key ] = cleangqlResponse(obj[ key ]);
            }
        }
        return newObj;
    } else if (Array.isArray(obj)) {
        return obj.map((item) => cleangqlResponse(item));
    }
    return obj;
}

