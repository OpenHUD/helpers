import branch from '../src/branch.js';
import get from 'lodash/get';
import { expect } from 'chai';


describe.only('branch', () => {
    describe.only('fold', () => {
        it ('1st priority is fold', () => {
            const tree = {
                0: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '0'
            })).to.equal(get(tree, '0'));
        });

        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '0'
            })).to.be.null;
        });
    });

    describe.only('call', () => {
        it ('1st priority is call', () => {
            const tree = {
                1: {
                    _: [0, 0]
                },
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '1'
            })).to.equal(get(tree, '1'));
        });

        it ('2nd priority is raise-min', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '1'
            })).to.equal(get(tree, '5'));
        });

        it ('3rd priority is raise (any)', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '1'
            })).to.equal(get(tree, '40060'));
        });

        it ('4th priority is pot', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '1'
            })).to.equal(get(tree, '2'));
        });

        it ('5th priority is all-in', () => {
            const tree = {
                3: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '1'
            })).to.equal(get(tree, '3'));
        });

        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '1'
            })).to.be.null;
        });
    });

    describe.only('pot', () => {
        it ('1st priority is pot', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '2'
            })).to.equal(get(tree, '2'));
        });

        it ('2nd priority is all-in', () => {
            const tree = {
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '2'
            })).to.equal(get(tree, '3'));
        });

        it ('3rd priority is raise (any)', () => {
            const tree = {
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '2'
            })).to.equal(get(tree, '40060'));
        });

        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '2'
            })).to.be.null;
        });
    });

    describe.only('all-in', () => {
        it ('1st priority is all-in', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '3'
            })).to.equal(get(tree, '3'));
        });

        it ('2nd priority is pot', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '3'
            })).to.equal(get(tree, '2'));
        });

        it ('3rd priority is raise (any)', () => {
            const tree = {
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '3'
            })).to.equal(get(tree, '40060'));
        });

        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '3'
            })).to.be.null;
        });
    });

    describe.only('raise', () => {
        it ('1st priority is raise (any)', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.equal(get(tree, '40060'));
        });

        it ('2nd priority is pot', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.equal(get(tree, '2'));
        });

        it ('3rd priority is all-in', () => {
            const tree = {
                3: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.equal(get(tree, '3'));
        });

        it ('4th priority is raise-min', () => {
            const tree = {
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.equal(get(tree, '5'));
        });
        
        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.be.null;
        });
    });

    describe.only('raise-min', () => {
        it ('1st priority is raise-min', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                },
                5: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '5'
            })).to.equal(get(tree, '5'));
        });

        it ('2nd priority is raise (any)', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                },
                40060: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '5'
            })).to.equal(get(tree, '40060'));
        });

        it ('3rd priority is pot', () => {
            const tree = {
                2: {
                    _: [0, 0]
                },
                3: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '5'
            })).to.equal(get(tree, '2'));
        });

        it ('4th priority is all-in', () => {
            const tree = {
                3: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: '5'
            })).to.equal(get(tree, '3'));
        });
        
        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: '40065'
            })).to.be.null;
        });
    });

    describe.only('unknown action', () => {
        it ('1st priority is the action', () => {
            const tree = {
                X: {
                    _: [0, 0]
                }
            };
            
            expect(branch({
                tree,
                branch: 'X'
            })).to.equal(get(tree, 'X'));
        });

        it ('fails otherwise', () => {
            const tree = {};
            
            expect(branch({
                tree,
                branch: 'X'
            })).to.be.null;
        });
    });    
});