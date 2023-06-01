export interface IBoolean {
    bool(): Boolean;
}


const generateBool = () => {
    let boolSet = [true, false];
    return boolSet[Math.floor(Math.random() * 2)] ?? true;
};

const boolType: IBoolean = {
    bool: () => generateBool(),
}

export default boolType;