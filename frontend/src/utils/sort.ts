export const sortTable = (data: Array<any>) => {
  const result = data.sort((a, b) => {
    const numA = parseInt(a.tableNumber.slice(1));
    const numB = parseInt(b.tableNumber.slice(1));

    if (numA < numB) return -1;
    if (numA > numB) return 1;

    const strA = a.tableNumber[0].toLowerCase();
    const strB = b.tableNumber[0].toLowerCase();

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });
  return result;
};

export const sortTableHub = (data: Array<any>) => {
  const result = data.sort((a, b) => {
    const numA = parseInt(a.TableNumber.slice(1));
    const numB = parseInt(b.TableNumber.slice(1));

    if (numA < numB) return -1;
    if (numA > numB) return 1;

    const strA = a.TableNumber[0].toLowerCase();
    const strB = b.TableNumber[0].toLowerCase();

    if (strA < strB) return -1;
    if (strA > strB) return 1;
    return 0;
  });
  return result;
};

export const sortQueue = (data: Array<any>) => {
  const sortedQueues = data.sort((a, b) => {
    const queueNumberA = parseInt(a.QueueNumber.replace(/\D/g, ""), 10);
    const queueNumberB = parseInt(b.QueueNumber.replace(/\D/g, ""), 10);
    return queueNumberA - queueNumberB;
  });

  return sortedQueues;
};
