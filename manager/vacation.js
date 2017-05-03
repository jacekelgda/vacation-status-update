import * as apiHandler from '../handlers/api'
import * as storeHandler from '../handlers/store'

const userStartVacation = async function(user) {
  let vacationDetails = await storeHandler.getVacationDetails(user.userId)
  if (!vacationDetails[0].vacationStarted) {
    let teamId = await storeHandler.getUserTeamId(user.userId)
    let token = await storeHandler.getTeamApiToken(teamId)
    await apiHandler.changeUserProfile(token, user.userId, vacationDetails[0].status, ':no_entry:')
    storeHandler.setVacationDetailsStarted(user.userId, vacationDetails[0])
  }
}

const userEndVacation = async function(user) {
  let vacationDetails = await storeHandler.getVacationDetails(user.userId)
  if (vacationDetails[0].vacationStarted && !vacationDetails[0].vacationEnded) {
    let teamId = await storeHandler.getUserTeamId(user.userId)
    let token = await storeHandler.getTeamApiToken(teamId)
    await apiHandler.changeUserProfile(token, user.userId, '', '')
    storeHandler.setVacationDetailsEnded(user.userId, vacationDetails[0])
  }
}

export {
  userStartVacation,
  userEndVacation
}