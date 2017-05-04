import slack from 'slack-node'
import * as errorUtil from '../util/error'

const changeUserProfile = (token, userId, text, emoji) => {
  return new Promise((resolve, reject) => {
    const profile = `{"status_text":"${text}","status_emoji": "${emoji}"}`
    const apiCallData = { user: userId, profile: profile}
    const slackClient = new slack(token)
    slackClient.api('users.profile.set', apiCallData, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const getUserData = (token, userId) => {
  return new Promise((resolve, reject) => {
    const slackClient = new slack(token)
    slackClient.api('users.info', {user: userId}, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response.user.profile)
      }
    })
  })
}

const identifyDevBotData = () => {
  return new Promise((resolve, reject) => {
    const slackClient = new slack(process.env.slack_bot_token)
    slackClient.api('auth.test', (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const exchangeCodeForToken = (code) => {
  return new Promise((resolve, reject) => {
    const data = {
      client_id: process.env.slack_app_client_id,
      client_secret: process.env.slack_app_client_secret,
      code,
      redirect_uri: process.env.slack_app_redirect_uri,
    }
    const slackClient = new slack(process.env.slack_api_token)
    slackClient.api('oauth.access', data, (err, response) => {
      try {
        errorUtil.handleAuthResponse(response)
      } catch (e) {
        reject('invalid token')
      } finally {
        resolve(response)
      }
    })
  })
}

export {
  changeUserProfile,
  getUserData,
  exchangeCodeForToken,
  identifyDevBotData,
}
