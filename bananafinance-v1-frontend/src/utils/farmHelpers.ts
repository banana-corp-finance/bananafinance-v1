const ARCHIVED_FARMS_START_PID = 139
const ARCHIVED_FARMS_END_PID = 250

const GRIMEX_STAKE_START_PID = 200
const GRIMEX_STAKE_END_PID = 500

const isArchivedPid = (pid: number) => pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID
export const isEarnGrimexPid = (pid: number) => pid >= GRIMEX_STAKE_START_PID && pid <= GRIMEX_STAKE_END_PID

export default isArchivedPid










