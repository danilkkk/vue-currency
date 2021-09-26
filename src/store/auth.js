import firebase from 'firebase/app'


export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e){
                commit('setError', e);                
                console.log(dispatch);
                throw e
            }
        },

        async register({dispatch, commit}, {email, password, name}) {
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name
                })
            } catch (e){
                commit('setError', e);  
                console.log(e);
                console.log(dispatch);
                throw e
            }
        },
        async getUid() {
            const user = firebase.auth().currentUser;
            return user ? user.uid : null;
        },
        async logout({commit}) {
            await firebase.auth().signOut();
            commit('clearInfo');
        }
    }
}