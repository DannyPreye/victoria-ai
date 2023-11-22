export const convertToWordDoc = (data: string, filename: string) =>
{
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>`;
    const newHtml = header + data + "</body></html>";
    // Convert HTML to blob
    const blob = new Blob([ '\ufeff', newHtml ], {
        type: 'application/msword'
    });

    // Create the download link
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(newHtml);

    return url;

};
