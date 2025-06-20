export const generateId = async (
  model: any,
  prefix: string,
  fieldName: string,
): Promise<string> => {
  const currentDate = new Date();
  const yearMonth = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;

  const query = { [fieldName]: new RegExp(`^${prefix}-${yearMonth}-`) };
  const lastDoc = await model
    .findOne(query, { [fieldName]: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  const currentId = lastDoc?.[fieldName]
    ? lastDoc[fieldName].split('-')[2]
    : undefined;
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  
  const newId = `${prefix}-${yearMonth}-${incrementedId}`;

  return newId;
};
