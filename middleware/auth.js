
export default ({ store, app }) => {
	if(store.state.auth.user === null)	{
		store.dispatch('auth/anonymous')
	}
}
