import moment from 'moment';

export default async (database, day) => {
  const results = await database.find('busLocation', {
    where: {
      collectedOn: {
        and: {
          gte: moment(day)
            .startOf('day')
            .toDate(),
          lte: moment(day)
            .endOf('day')
            .toDate(),
        },
      },
    },
  });

  return results;
};
