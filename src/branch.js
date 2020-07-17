import get from 'lodash/get';

const branchFirstRaiseAction = tree => {
    const raises = Object.keys(tree).filter(action => action.startsWith('4'));
    return (raises.length > 0) ? tree[raises[0]] : null;
};

const branchFoldAlt = tree => {
    return tree[0] || null;
};

const branchCallAlt = tree => {
    return tree[1] || tree['5'] || branchFirstRaiseAction(tree) || tree['2'] || tree['3'] || null;
};

const branchPotAlt = tree => {
    return tree['2'] || tree['3'] || branchFirstRaiseAction(tree) || null;
};

const branchAllInAlt = tree => {
    return tree['3'] || tree['2'] || branchFirstRaiseAction(tree) || null;
};

const branchRaiseAlt = tree => {
    return branchFirstRaiseAction(tree) || tree['2'] || tree['3'] || tree['5'] || null;
};

const branchRaiseMinAlt = tree => {
    return tree['5'] || branchFirstRaiseAction(tree) || tree['2'] || tree['3'] || null;
};


const branchBestAction = (tree, action) => {
    switch (action[0]) {
        case '0': return branchFoldAlt(tree);
        case '1': return branchCallAlt(tree);
        case '2': return branchPotAlt(tree);
        case '3': return branchAllInAlt(tree);
        case '4': return branchRaiseAlt(tree);
        case '5': return branchRaiseMinAlt(tree);
        default: return tree[action] || null;
    }
};

const branch = ({tree, branch}) => {
    const actions = branch.split('.');
    for (let i = 0; i < actions.length; ++i) {
        const action = actions[i];
        tree = branchBestAction(tree, action);

        if (!tree) {
            break;
        }
    }

    return tree;
};

export default branch;