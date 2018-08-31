import moment from 'moment';

export default async (database, day) => {
  const start = moment(day)
    .startOf('day')
    .format();
  const end = moment(day)
    .endOf('day')
    .format();

  const results = await database.find('busLocation', {
    where: {
      collectedOn: {
        and: {
          gte: start,
          lte: end,
        },
      },
    },
  });

  return results;
};
