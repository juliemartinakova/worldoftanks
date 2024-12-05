let defaultSettings = {
    general: {
        language: "en",
        server: 1,
        selectedVehicle: "",
        chat: {
            filterDirtyLanguage: 1,
            hideSpam: 1,
            showMessageDate: 1,
            showMessageTime: 1,
            receiveInvitationsFromFriendsOnly: 0,
            receiveInBattlePlatoonInvitation: 1,
            receiveFriendRequest: 1,
            receiveMessagesFromContactsOnly: 0,
            hideTeamChat: 0,
            receiveClanNotifications: 1
        },
        battleCommunication: {
            showPointMessagesInTeamPanel: 1,
            showPinned: 1,
            showPersonalCommands: 1,
            showBaseMarksInRandom: 1
        },
        randomBattleOptions: {
            standard: 1,
            encounter: 1,
            assault: 1,
            grand: 1,
            mapsInDevelopement: 1
        },
        vehiclePanel: {
            mode: 0,
            showStats: 1
        },
        customization: {
            mode: 0
        },
        battleInterface: {
            showVehicleTier: 1,
            showKilledEnemyDogtag: 1,
            showDestroyerDogtag: 1,
            showAppliedDogtag: 1,
            showAnimatedDogtag: 1,
            enableOpticalEffectsInSnipermode: 1,
            postmortemMode: 1,
            dynamicCamera: 1,
            smoothCameraZoom: 1,
            enableTacticalView: 1,
            enableCommanderView: 1,
            horizontalStabInSnipermode: 1,
            toogleExtraZoom: 1,
            limitViewModeSwitchtoShift: 0,
            autoFixHullInSnipermode: 0,
            useServerReticle: 0,
            prefferedSniperZoom: 0,
            showVehicleMarkerOnBattleResult: 1,
            showNoDamageNotification: 1,
            showWheeledSpeedometer: 1,
            showModuleRepairTime: 1,
            showPrevBattleResultInChat: 1,
            showHPInTeamPanel: 1,
            showHPOnMinimap: 1,
            extendedMinimapOptions: 0,
            showBeginnerTipsOnBattleLoading: 1,
            tipsOnBattleLoading: 1,
            showBeginnerTipsInRandom: 1,
            toogleEquipmentConfigOnBattleLoading: 1
        },
        minimap: {
            opacity: 1,
            showMarkers: 1,
            showCameraDirection: 1,
            showArtyShootingSector: 1,
            showProxyRange: 1,
            showViewRange: 1,
            showMaxViewRange: 1,
            showRenderRange: 1,
            showArtyShotPoints: 1
        },
        hangarCamera: {
            autoRotationDelay: 0,
            enableParallax: 1
        },
        saveReplays: undefined,
        showMOE: 1,
        showPlatoonVehicleModels: 1,
        showServerSelect: 1,
        useAnonymizer: 0
    },
    graphics: {
        preset: 0,
        renderQuality: 100,
        fpsCap: Infinity,
        screen: {
            fov: 75,
            msaa: true,
            guiScale: 1,
            altColors: 0,
            gamma: 1,
            filter: {
                contast: 1,
                brightness: 1,
                saturation: 1,
                preset: 0
            }
        },
        details: {
            main: {
                antialiasing: 0,
                textureQuality: 0,
                OBJLod: 0,
                renderDistance: 0,
            },
            environment: {
                waterQuality: 0,
                terrainQuality: 0,
                tesselation: 0,
                snipermodeTesselation: 0
            },
            postprocessing: {
                lightningQuality: 0,
                shadowQuality: 0,
                postProcessing: 0,
                motionBlur: 0
            },
            vegetation: {
                vegetationQuality: 0,
                grassDensity: 0,
                vegetationTransparency: 0,
                snipermodeGrass: 0
            },
            effects: {
                effectsQuality: 0,
                snipermodeEffectsQuality: 0,
                trackPhysics: 0,
                betterPhysics: 0,
                trackEffects: 0,
                trackMarks: 0
            }
        }
    },
    audio: { //* the volume formula is: allowed * master/100 * interface (vehicles, effects, etc...)
        audio: {
            volume: {
                allowed: 1,
                master: 25,
                interface: 100,
                vehicles: 100,
                voiceover: 100,
                effects: 100,
                environment: 100,
                musicGarage: 100,
                musicBattle: 100
            },
            presets: {
                nightmode: 0,
                bassBoost: 0,
                subtitles: 0,
                mode: 0,
                system: 0
            },
            sounds: {
                crew: 0,
                sixthsense: 0,
                soundDetection: undefined
            }
        },
        voice: {
            allowed: 0,
            volume: 100,
            environmentVolume: 100,
            shortcut: "keyQ"
        }
    },
    controls: {
        invertReverse: 0,
        keyboard: {
            driving: {
                forward: "keyW",
                reverse: "keyS",
                left: "keyA",
                right: "keyD",
                fixHull: "keyX",
                manualBreak: "Space"
            },
            speedControl: {
                forward: "keyR",
                reverse: "keyF",
                stopAndShoot: undefined
            },
            shooting: {
                shoot: 0,
                salvo: 0,
                autoaim: 2,
                releaseAutoaim: 2,
                specialReticle: "ShiftLeft",
                trajectory: "keyG",
                reloadMagazine: "keyC"
            },
            other: {
                hideGui: "keyV",
                missionProgress: "keyN",
                leaveVehicle: "keyJ",
                reserves: "keyB"
            },
            consumables: {
                consumable1: "Digit1",
                consumable2: "Digit2",
                consumable3: "Digit3",
                consumable4: "Digit4",
                consumable5: "Digit5",
                consumable6: "Digit6",
                consumable7: "Digit7",
                consumable8: "Digit8",
                consumable9: "Digit9",
                consumable10: "Digit0"
            },
            teamCommunication: {
                markPosition: "keyT",
                activeTarget: "F2",
                commandMenu: "keyY",
                help: "F7",
                loading: "F8",
                retreat: "F4",
                affirmative: "F5",
                negative: "F6",
                thanks: "F3"
            },
            camera: {
                up: "ArrowUp",
                down: "ArrowDown",
                left: "ArrowLeft",
                right: "ArrowRight"
            },
            voice: {
                activateMic: "keyQ",
                toggleVoice: "keyH"
            },
            minimap: {
                expand: "Minus",
                shrink: "Equal",
                toggle: "keyM"
            }
        },
        mouse: {
            sensitivity: {
                arcade: 1,
                sniper: 1,
                artillery: 1,
                trajectory: 1,
                free: 1
            },
            invertHorizontal: 0,
            invertVertical: 0
        }
    },
    reticle: {
        arcade: {
            indicator: 0,
            indicatorOpacity: 1,
            centralMarker: 0,
            centralMarkerOpacity: 1,
            loadingOpacity: 1,
            stateOpacity: 1,
            aiming: 0,
            aimingOpacity: 1,
            aimingIndicator: 0,
            aimingIndicatorOpacity: 1,
            magazineOpacity: 1,
            loadingIndicatorOpacity: 1
        },
        sniper: {
            indicator: 0,
            indicatorOpacity: 1,
            centralMarker: 0,
            centralMarkerOpacity: 1,
            loadingOpacity: 1,
            stateOpacity: 1,
            aiming: 0,
            aimingOpacity: 1,
            aimingIndicator: 0,
            aimingIndicatorOpacity: 1,
            magazineOpacity: 1,
            loadingIndicatorOpacity: 1,
            zoomOpacity: 1
        },
        artillery: {
            showShellFlightTime: 1,
            zoomIndicator: 1,
            autoSwitchMode: 1,
            controlMode: 0,
            initialMode: 0
        },
        outline: {
            mode: 1,
            shootable: 0,
            unshootable: 0
        }
    },
    markers: {
        enemy: {
            normal: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 0,
                hpIndicator: 1,
                autoaimIndicator: 1,
                vehicleHP: 2,
                receivedDMG: 1
            },
            alt: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 1,
                hpIndicator: 1,
                autoaimIndicator: 1,
                vehicleHP: 1,
                receivedDMG: 1
            }
        },
        ally: {
            normal: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 0,
                hpIndicator: 1,
                vehicleHP: 2,
                receivedDMG: 1
            },
            alt: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 1,
                hpIndicator: 1,
                vehicleHP: 1,
                receivedDMG: 1
            }
        },
        destroyed: {
            normal: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 0,
                hpIndicator: 1,
                vehicleHP: 1,
                receivedDMG: 1
            },
            alt: {
                icon: 1,
                tier: 1,
                vehicle: 1,
                nickname: 1,
                hpIndicator: 1,
                vehicleHP: 1,
                receivedDMG: 1
            }
        }
    },
    notifications: {
        fireDirection: {
            type: 0,
            showCriticalHits: 1,
            showTeamHits: 1,
            showDamage: 1,
            dynamicPointer: 1,
            shooterTankName: 1,
            animation: 1
        },
        events: {
            show: 1,
            eventName: 1,
            vehicle: 1,
            receivedDMG: {
                damage: 1,
                critical: 1,
                blocked: 1,
            },
            battlePerformance: {
                capPointsRemoved: 1,
                capPointsCapped: 1,
                spotting: 1,
                ramming: 1,
                destroyed: 1,
                trackDestroyed: 1,
                criticalHit: 1,
                shootDamage: 1,
                impactDamage: 1,
                spottingDamage: 1,
                stunningDamage: 1,
                setonfire: 1,
                crewSkills: 1
            }
        },
        record: {
            damage: {
                showCaused: 1,
                showBlocked: 1,
                showAssisted: 1,
                showStunned: 1
            },
            showDetails: 0,
            eventType: 0,
            positionMode: 0
        },
        mapBorders: {
            type: 0,
            highlight: 0
        },
        battleInfoAndMissions: {
            hpPanel: 1,
            hpQuantity: 1,
            hpDelta: 1,
            sortByTier: 0,
            showMissions: 1,
            missionDetails: 1
        }
    }
}

defaultSettings.general.language = navigator.language

export let currentSettings = {}

if(localstorage_get("game_settings") == "" || localstorage_get("game_settings") == null){
    currentSettings = defaultSettings
    localstorage_set("game_settings", JSON.stringify(currentSettings))
} else {
    currentSettings = JSON.parse(localstorage_get("game_settings"))
    currentSettings.general.language = defaultSettings.general.language
    localstorage_set("game_settings", JSON.stringify(currentSettings))
}

export function localstorage_get(key){
    let storedItem = localStorage.getItem(key)
    return storedItem
}

export function localstorage_set(key, value){
    localStorage.setItem(key, value)
}

export function localstorage_delete(key){
    localStorage.removeItem(key)
}

export function settings_set(setting, value){
    const setting_path = setting.split(".")
    const last_path_part = setting_path.pop()

    const modified_setting = setting_path.reduce((obj, key) => {
        if (!obj[key] || obj[key] === undefined) {
            throw new Error(`The setting "${key}" doesn't exist.`)
        }
        return obj[key];
    }, currentSettings);

    if (modified_setting[last_path_part] === undefined) {
        throw new Error(`The setting "${last_path_part}" does not exist in the setting path "${setting_path}".`);
    }
    
    modified_setting[last_path_part] = value
    localstorage_set("game_settings", JSON.stringify(currentSettings))
}
export function settings_get(setting){
    const setting_path = setting.split(".")
    const last_path_part = setting_path.pop()

    const modified_setting = setting_path.reduce((obj, key) => {
        if (!obj[key] || obj[key] === undefined) {
            throw new Error(`The setting "${key}" doesn't exist.`)
        }
        return obj[key];
    }, currentSettings);

    if (modified_setting[last_path_part] === undefined) {
        throw new Error(`The setting "${last_path_part}" does not exist in the setting path "${setting_path}".`);
    }
    
    return modified_setting[last_path_part]
}

/* 
* USAGE OF THE FUNCTIONS IN THIS FILE
--------------------
* 1. localstorage_get(key: string) => returns the value of a specified key

* localstorage_get("name-of-the-localstorage-key")
--------------------
* 2. localstorage_set(key: string, value: string, number or boolean) => sets a variable to localStorage with its value which can be accessed next time the user loads the game

* localstorage_set("name-of-the-localstorage-key", "the-value-you-want-to-assign")
--------------------
* 3. localstorage_delete(key: string) => deletes the specified key from localStorage

* localstorage_delete("name-of-the-localstorage-key")
--------------------
* 4. settings_set(setting: string, value: string, number or boolean) => changes the specified setting to the specified value:

* settings_set("general.language", "the-setting-value")
--------------------
* 5. settings_get(setting: string) => returns the specified setting value. Use this function encapsulated in console.log() or assign it to a variable:

* console.log(settings_get("general.language")) to view the value in devtools console
* ---OR---
* variable = settings_get("general.language") to further work with the value
--------------------
*/