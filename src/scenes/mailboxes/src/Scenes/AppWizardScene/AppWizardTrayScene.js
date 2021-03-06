import React from 'react'
import { settingsStore } from 'stores/settings'
import shallowCompare from 'react-addons-shallow-compare'
import { Dialog, RaisedButton } from 'material-ui'
import { TrayIconEditor } from 'Components/Tray'

export default class AppWizardTrayScene extends React.Component {
  /* **************************************************************************/
  // Component Lifecycle
  /* **************************************************************************/

  componentDidMount () {
    settingsStore.listen(this.settingsUpdated)
  }

  componentWillUnmount () {
    settingsStore.unlisten(this.settingsUpdated)
  }

  /* **************************************************************************/
  // Data Lifecycle
  /* **************************************************************************/

  state = (() => {
    return {
      tray: settingsStore.getState().tray,
      open: true
    }
  })()

  settingsUpdated = (settingsState) => {
    this.setState({ tray: settingsState.tray })
  }

  /* **************************************************************************/
  // UI Events
  /* **************************************************************************/

  handleCancel = () => {
    this.setState({ open: false })
    setTimeout(() => { window.location.hash = '/' }, 500)
  }

  handleNext = () => {
    this.setState({ open: false })
    setTimeout(() => { window.location.hash = '/app_wizard/mailto' }, 250)
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const { tray, open } = this.state

    const actions = (
      <div>
        <RaisedButton
          label='Cancel'
          style={{ float: 'left' }}
          onClick={this.handleCancel} />
        <RaisedButton
          label='Next'
          primary
          onClick={this.handleNext} />
      </div>
    )

    return (
      <Dialog
        modal={false}
        title='Tray Icon'
        actions={actions}
        open={open}
        autoScrollBodyContent
        onRequestClose={this.handleNext}>
        <p style={{ textAlign: 'center' }}>
          Customise the tray icon so that it fits in with the other icons in
          your taskbar. You can change the way the icon appears when you have unread
          mail and when you have no unread mail
        </p>
        <TrayIconEditor
          tray={tray}
          style={{ textAlign: 'center' }}
          trayPreviewStyles={{ margin: '0px auto' }} />
      </Dialog>
    )
  }
}
