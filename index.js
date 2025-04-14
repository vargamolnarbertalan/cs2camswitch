/// <reference path="./types/index.d.ts" />
var lastSpecPos = -1;
let inOneVsOne = false;

/**
 * This is config-generating function - it starts before the onStart callback, and decides how does the settings for addon look like.
 * Because it's async and first function to be called, it can fetch data from 3rd party APIs to help building settings panel.
 */
loadConfig(async () => {
    const config = [
        {
            name: "companionPath",
            type: "text",
            label: "Companion url (example: http://192.168.1.64:8000)"
        },
        {
            name: "companionPage",
            type: "text",
            label: "Companion page for this addon (example: 20)"
        },
        {
            name: "targetPlayer1",
            type: "player",
            label: "Player for Companion Button 0/1 and 2/1"
        },
        {
            name: "targetPlayer6",
            type: "player",
            label: "Player for Companion Button 1/1 and 3/1"
        },
        {
            name: "targetPlayer2",
            type: "player",
            label: "Player for Companion Button 0/2 and 2/2"
        },
        {
            name: "targetPlayer7",
            type: "player",
            label: "Player for Companion Button 1/2 and 3/2"
        },
        {
            name: "targetPlayer3",
            type: "player",
            label: "Player for Companion Button 0/3 and 2/3"
        },
        {
            name: "targetPlayer8",
            type: "player",
            label: "Player for Companion Button 1/3 and 3/3"
        },
        {
            name: "targetPlayer4",
            type: "player",
            label: "Player for Companion Button 0/4 and 2/4"
        },
        {
            name: "targetPlayer9",
            type: "player",
            label: "Player for Companion Button 1/4 and 3/4"
        },
        {
            name: "targetPlayer5",
            type: "player",
            label: "Player for Companion Button 0/5 and 2/5"
        },
        {
            name: "targetPlayer10",
            type: "player",
            label: "Player for Companion Button 1/5 and 3/5"
        }
    ]

    return config;
});


/**
 * onStart runs after loadConfig()
 * config: inital values for the config, empty or filled with the values of the last run
 * close: force-closes the addon, initiates onClose()'s callback
 * onConfigChange: listens for change in the config
 * CSGOGSI: GSI Event Listener Instance
 */
onStart(async ({ CSGOGSI, config, close, onConfigChange, onAction }) => {

    /**
     * Accessing inital config
     */
    console.log('--------------------------------------------------------------')
    let compPath = config?.companionPath;
    let compPage = config?.companionPage;
    let companionPlayer1 = config?.targetPlayer1?.player?.steamid;
    let companionPlayer2 = config?.targetPlayer2?.player?.steamid;
    let companionPlayer3 = config?.targetPlayer3?.player?.steamid;
    let companionPlayer4 = config?.targetPlayer4?.player?.steamid;
    let companionPlayer5 = config?.targetPlayer5?.player?.steamid;
    let companionPlayer6 = config?.targetPlayer6?.player?.steamid;
    let companionPlayer7 = config?.targetPlayer7?.player?.steamid;
    let companionPlayer8 = config?.targetPlayer8?.player?.steamid;
    let companionPlayer9 = config?.targetPlayer9?.player?.steamid;
    let companionPlayer10 = config?.targetPlayer10?.player?.steamid;


    /**
     * You can listen for changes in config while addon is running
     */
    onConfigChange(newConfig => {
        compPath = config?.companionPath;
        compPage = config?.companionPage;
        companionPlayer1 = newConfig?.targetPlayer1?.player?.steamid;
        companionPlayer2 = newConfig?.targetPlayer2?.player?.steamid;
        companionPlayer3 = newConfig?.targetPlayer3?.player?.steamid;
        companionPlayer4 = newConfig?.targetPlayer4?.player?.steamid;
        companionPlayer5 = newConfig?.targetPlayer5?.player?.steamid;
        companionPlayer6 = newConfig?.targetPlayer6?.player?.steamid;
        companionPlayer7 = newConfig?.targetPlayer7?.player?.steamid;
        companionPlayer8 = newConfig?.targetPlayer8?.player?.steamid;
        companionPlayer9 = newConfig?.targetPlayer9?.player?.steamid;
        companionPlayer10 = newConfig?.targetPlayer10?.player?.steamid;
    });

    const onSpecPosChange = (id, player) => {
        if (id == "free") {
            lastSpecPos = id;
            //console.log(`Freecam is ON`);
            companionCall(compPath, compPage, 2, 7);
            return;
        }
        lastSpecPos = id;
        switch (player.steamid) {
            case companionPlayer1:
                companionCall(compPath, compPage, 0, 1);
                break;
            case companionPlayer2:
                companionCall(compPath, compPage, 0, 2);
                break;
            case companionPlayer3:
                companionCall(compPath, compPage, 0, 3);
                break;
            case companionPlayer4:
                companionCall(compPath, compPage, 0, 4);
                break;
            case companionPlayer5:
                companionCall(compPath, compPage, 0, 5);
                break;
            case companionPlayer6:
                companionCall(compPath, compPage, 1, 1);
                break;
            case companionPlayer7:
                companionCall(compPath, compPage, 1, 2);
                break;
            case companionPlayer8:
                companionCall(compPath, compPage, 1, 3);
                break;
            case companionPlayer9:
                companionCall(compPath, compPage, 1, 4);
                break;
            case companionPlayer10:
                companionCall(compPath, compPage, 1, 5);
                break;
            default:
                companionCall(compPath, compPage, 2, 7); //How can it occur?
        }
        //console.log(`New spectated steamid: ${id}`);
        companionCall(compPath, compPage, 3, 7);
        //console.log(`Freecam is OFF`);

        return;
    }

    const companionCall = async (url, page, row, column) => {
        const finalUrl = url + `/api/location/${page}/${row}/${column}/press`;
        const response = await fetch(finalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return;
    }

    const checkOnevsOne = (data) => {
        const playerData = data.players;
        if (!playerData) return false;

        const leftAlive = playerData.filter(p => p.team.orientation === 'left' && p.state.health > 0);
        const rightAlive = playerData.filter(p => p.team.orientation === 'right' && p.state.health > 0);

        if (leftAlive.length === 1 && rightAlive.length === 1) {
            if (!inOneVsOne) {
                // SELECT LEFT
                switch (leftAlive[0].steamid) {
                    case companionPlayer1:
                        companionCall(compPath, compPage, 0, 1);
                        break;
                    case companionPlayer2:
                        companionCall(compPath, compPage, 0, 2);
                        break;
                    case companionPlayer3:
                        companionCall(compPath, compPage, 0, 3);
                        break;
                    case companionPlayer4:
                        companionCall(compPath, compPage, 0, 4);
                        break;
                    case companionPlayer5:
                        companionCall(compPath, compPage, 0, 5);
                        break;
                    case companionPlayer6:
                        companionCall(compPath, compPage, 1, 1);
                        break;
                    case companionPlayer7:
                        companionCall(compPath, compPage, 1, 2);
                        break;
                    case companionPlayer8:
                        companionCall(compPath, compPage, 1, 3);
                        break;
                    case companionPlayer9:
                        companionCall(compPath, compPage, 1, 4);
                        break;
                    case companionPlayer10:
                        companionCall(compPath, compPage, 1, 5);
                        break;
                    default:
                        companionCall(compPath, compPage, 1, 7); //How can it occur?
                }
                // SELECT RIGHT
                switch (rightAlive[0].steamid) {
                    case companionPlayer1:
                        companionCall(compPath, compPage, 2, 1);
                        break;
                    case companionPlayer2:
                        companionCall(compPath, compPage, 2, 2);
                        break;
                    case companionPlayer3:
                        companionCall(compPath, compPage, 2, 3);
                        break;
                    case companionPlayer4:
                        companionCall(compPath, compPage, 2, 4);
                        break;
                    case companionPlayer5:
                        companionCall(compPath, compPage, 2, 5);
                        break;
                    case companionPlayer6:
                        companionCall(compPath, compPage, 3, 1);
                        break;
                    case companionPlayer7:
                        companionCall(compPath, compPage, 3, 2);
                        break;
                    case companionPlayer8:
                        companionCall(compPath, compPage, 3, 3);
                        break;
                    case companionPlayer9:
                        companionCall(compPath, compPage, 3, 4);
                        break;
                    case companionPlayer10:
                        companionCall(compPath, compPage, 3, 5);
                        break;
                    default:
                        companionCall(compPath, compPage, 1, 7); //How can it occur?
                }
                // SET 1v1 MODE
                companionCall(compPath, compPage, 0, 7);
                inOneVsOne = true;
                console.log('1v1 situation started!');
                console.log(`Left: ${leftAlive[0].name}, Right: ${rightAlive[0].name}`);
                return true;
            }
        } else if (inOneVsOne) {
            // SET 1v1 MODE OFF
            companionCall(compPath, compPage, 1, 7);
            switch (data.player.steamid) {
                case companionPlayer1:
                    companionCall(compPath, compPage, 0, 1);
                    break;
                case companionPlayer2:
                    companionCall(compPath, compPage, 0, 2);
                    break;
                case companionPlayer3:
                    companionCall(compPath, compPage, 0, 3);
                    break;
                case companionPlayer4:
                    companionCall(compPath, compPage, 0, 4);
                    break;
                case companionPlayer5:
                    companionCall(compPath, compPage, 0, 5);
                    break;
                case companionPlayer6:
                    companionCall(compPath, compPage, 1, 1);
                    break;
                case companionPlayer7:
                    companionCall(compPath, compPage, 1, 2);
                    break;
                case companionPlayer8:
                    companionCall(compPath, compPage, 1, 3);
                    break;
                case companionPlayer9:
                    companionCall(compPath, compPage, 1, 4);
                    break;
                case companionPlayer10:
                    companionCall(compPath, compPage, 1, 5);
                    break;
                default:
                    companionCall(compPath, compPage, 2, 7); //How can it occur?
            }
            companionCall(compPath, compPage, 3, 7);
            console.log('1v1 situation over!');
            inOneVsOne = false;
            return false;
        }
        return false;
    }


    CSGOGSI.on("data", (csdata) => {
        checkOnevsOne(csdata);
        if (inOneVsOne === false) {
            const fetchedSpecPos = csdata.observer.spectarget;
            if (lastSpecPos != fetchedSpecPos) {
                onSpecPosChange(fetchedSpecPos, csdata.player);
            }
        }
    });
});

/**
 * Clean-up function, needs to handle clearing all of the event listeners, servers, connections, perform final dump, etc
 */
onClose(({ CSGOGSI, config }) => {
    CSGOGSI.removeAllListeners("data");
});
