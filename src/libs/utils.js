/* eslint-disable import/prefer-default-export */
export const chunkCardNo = (cardNo, gapArray) => {
    const chunks = new Array(gapArray + 1);

    for (let i = 0; i <= gapArray.length; i++) {
        const start = gapArray[i - 1] || 0;
        const end = gapArray[i] || cardNo.length;
        chunks[i] = cardNo.substring(start, end);
    }

    return chunks;
};
