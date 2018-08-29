export default async (database, day) => {
  const results = await database.find('busLocation', {
    collectedOn: day.toDate(),
  });

  return results;
};
