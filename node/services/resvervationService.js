
const tableName = "reservations";
const Sequelize = require('sequelize');
const generic = require('../models/generic');

const reservationService = {
    async getDistinctStatusWithCount() {
        try {
            return await generic.findAll({
                attributes: [
                    'status',
                    [Sequelize.fn('COUNT', Sequelize.col('status')), 'status_count']
                ],
                group: ['status'],
                order: [[Sequelize.literal('status_count'), 'DESC']]
            });
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },
    async getMultipleCounters() {
        try {
            return await generic.findAll({
                attributes: [
                    [
                        Sequelize.fn('COUNT', Sequelize.literal('DISTINCT CASE WHEN status IN ("confirmed", "finished") THEN ID END')),
                        'Total Bookings'
                    ],
                    [
                        Sequelize.fn('ROUND',
                            Sequelize.literal(
                                `(
                      SELECT AVG(CASE WHEN status = 'finished' AND stayTime IS NOT NULL THEN stayTime ELSE NULL END) / 60
                      FROM ${tableName}
                    )`),
                            2
                        ),
                        'Average Staytime'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.literal('DISTINCT CASE WHEN source = "manual" THEN ID END')),
                        'Manual Booking'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.literal('DISTINCT CASE WHEN source = "online" THEN ID END')),
                        'Online Booking'
                    ]
                ],
                raw: true,
            });
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },
    async getBookingMediumCounters() {
        try {
            return await generic.findAll({
                attributes: [
                    [
                        Sequelize.fn('COUNT', Sequelize.literal(`
                        CASE 
                            WHEN SUBSTR(referrer, INSTR(referrer, ' | ') + 3, 
                                        INSTR(SUBSTR(referrer, INSTR(referrer, ' | ') + 3), ' | ') - 1) = 'Desktop' 
                            THEN 1
                            ELSE NULL 
                        END
                        `)),
                        'Desktop'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.literal(`
                        CASE 
                            WHEN SUBSTR(referrer, INSTR(referrer, ' | ') + 3, 
                                        INSTR(SUBSTR(referrer, INSTR(referrer, ' | ') + 3), ' | ') - 1) = 'Mobile' 
                            THEN 1
                            ELSE NULL 
                        END
                        `)),
                        'Mobile'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.literal(`
                        CASE 
                            WHEN SUBSTR(referrer, INSTR(referrer, ' | ') + 3, 
                                        INSTR(SUBSTR(referrer, INSTR(referrer, ' | ') + 3), ' | ') - 1) = 'Tablet' 
                            THEN 1
                            ELSE NULL 
                        END
                        `)),
                        'Tablet'
                    ]
                ],
                raw: true,
            });
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },
    async getPeoplesCountYearly() {
        try {
            return await generic.findAll({
                attributes: [
                    [
                        Sequelize.fn('strftime', '%Y', Sequelize.col('reservedFor')),
                        'year'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.col('peopleCount')),
                        'people_count'
                    ]
                ],
                group: [Sequelize.fn('strftime', '%Y', Sequelize.col('reservedFor'))],
                order: [
                    [Sequelize.fn('strftime', '%Y', Sequelize.col('reservedFor')), 'DESC']
                ],
                raw: true
            });
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },
    async getPeoplesCountMonthly() {
        try {
            return await generic.findAll({
                attributes: [
                    [
                        Sequelize.literal(`
                            CASE
                                WHEN strftime('%m', reservedFor) = '01' THEN 'January'
                                WHEN strftime('%m', reservedFor) = '02' THEN 'February'
                                WHEN strftime('%m', reservedFor) = '03' THEN 'March'
                                WHEN strftime('%m', reservedFor) = '04' THEN 'April'
                                WHEN strftime('%m', reservedFor) = '05' THEN 'May'
                                WHEN strftime('%m', reservedFor) = '06' THEN 'June'
                                WHEN strftime('%m', reservedFor) = '07' THEN 'July'
                                WHEN strftime('%m', reservedFor) = '08' THEN 'August'
                                WHEN strftime('%m', reservedFor) = '09' THEN 'September'
                                WHEN strftime('%m', reservedFor) = '10' THEN 'October'
                                WHEN strftime('%m', reservedFor) = '11' THEN 'November'
                                WHEN strftime('%m', reservedFor) = '12' THEN 'December'
                                ELSE 'Unknown'
                            END
                        `),
                        'month_name'
                    ],
                    [
                        Sequelize.fn('COUNT', Sequelize.col('peopleCount')),
                        'people_count'
                    ]
                ],
                group: [
                    Sequelize.literal(`
                        strftime('%m', reservedFor)  -- Group by the numeric month
                    `)
                ],
                order: [
                    [Sequelize.literal(`
                        strftime('%m', reservedFor)  -- Order by the numeric month (ascending)
                    `), 'ASC']
                ],
                raw: true
            });
            
            
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

};

module.exports = reservationService;
