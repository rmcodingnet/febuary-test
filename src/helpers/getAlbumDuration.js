import moment from 'moment'

export const getAlbumDuration = (timeArray) => {
    const totalDurations = timeArray.slice(1)
        .reduce((prev, cur) => moment.duration(cur).add(prev),
            moment.duration(timeArray[0]))
    return moment.utc(totalDurations.asMilliseconds()).format("HH:mm:ss")

}