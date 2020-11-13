// Debug Props and State of a Component
const debugUpdate = (component, nextProp, prevProp, nextState, prevState) => {

    // Editor, Workspace, Box.Layer, Properties, Background
    const components = ['Box.Layer']

    if(components.indexOf(component) > -1) {

        console.groupCollapsed(`componentDidUpdate ${component}`);
        Object.entries(nextProp).forEach(([key, val]) => {
            if(prevProp[key] !== val) {
                console.group(`Prop '${key}' changed`);
                console.log("before", prevProp[key])
                console.log("after", val)
                console.groupEnd();
            }
        });
        if (nextState) {
        Object.entries(nextState).forEach(([key, val]) => {
            if(prevState[key] !== val) {
                console.group(`State '${key}' changed`);
                console.log("before", prevState[key])
                console.log("after", val)
                console.groupEnd();
            }
        });
        }
        console.groupEnd();

    }
}

export { debugUpdate };
