addLayer("s", {
    name: "Start",
    symbol: "S",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            latestUpgrade: 0,
        };
    },
    color: "red",
    requires: new Decimal(10),
    resource: "starting points",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.3,
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade('s', 15)) mult = mult.times(upgradeEffect('s', 15));
        if (hasUpgrade('s', 23)) mult = mult.times((3));
        if (hasUpgrade('s', 24)) mult = mult.times((1.5));
        return mult;
              },
    gainExp() {
        return new Decimal(1);
    },
    row: 0,
    hotkeys: [
        {
            key: "s",
            description: "S: Reset for starting points",
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() { return true },
        upgrades: {
            11: {
                title: "Really Boring UP1",
                description: "5x point gain. Starting with big numbers. ",
                cost: new Decimal(2),
                onPurchase() {
                    player[this.layer].latestUpgrade = 11;
                },
            },
            12: {
                title: "Really Boring UP2",
                description: "2x point gain. Too boring. ",
                cost: new Decimal(6),
                unlocked() {
                    return hasUpgrade("s", 11);
                },
                onPurchase() {
                    player[this.layer].latestUpgrade = 12;
                },
            },
            13: {
                title: "Really Boring UP3",
                description: "When will this wave of boring upgrades end? Starting points boost points gain slightly. ",
                cost: new Decimal(10),
                unlocked() {
                    return hasUpgrade("s", 12);
                },
                onPurchase() {
                    player[this.layer].latestUpgrade = 13;
                },
                effect() {
                    let baseEffect = player[this.layer].points.add(1.4).pow(0.125);
        
                    // Check if Upgrade 14 is purchased and increase the effect accordingly
                    if (hasUpgrade("s", 14)) {
                        baseEffect = baseEffect.pow(1.5);
                    }
        
                    return baseEffect;
                },
                effectDisplay() {
                    return format(upgradeEffect(this.layer, this.id)) + "x";
                },
            },
            14: {
                title: "Really Boring UP4",
                description: "Upgrade 13 formula is stronger.",
                cost: new Decimal(20),
                unlocked() {
                    return hasUpgrade("s", 13);
                },
                onPurchase() {
                    player[this.layer].upgrades[13] = player[this.layer].upgrades[13].pow(0.4);
                    player[this.layer].latestUpgrade = 14;
                },
            },
            15: {
                title: "Really Boring UP5",
                description: "Multiply starting point gain based on current points.",
                cost: new Decimal(30),
                unlocked() {
                    return hasUpgrade("s", 14);
                },
                effect() {
                    return player.points.add(1).log10().add(1).pow(0.9); // Adjust the formula as needed
                },
                effectDisplay() {
                    return format(upgradeEffect(this.layer, this.id)) + "x";
                },
                onPurchase() {
                    player[this.layer].latestUpgrade = 15;
                },
                row: 2,
               },
            21:  {
               title: "Really Boring UP6",
                 description: "Points boost their own gain based on their amount.",
                cost: new Decimal(60),
                 unlocked() {
                return hasUpgrade("s", 15); 
            },
            effect() {
                return player.points.add(1).log10().add(1).pow(0.55);
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x";
            },
            onPurchase() {
                player[this.layer].latestUpgrade = 21; },
               },

          22: {
                title: "Really Boring UP7",
                description: "4.10x point gain. Why not? ",
                cost: new Decimal(100),
                unlocked() { 
                        return hasUpgrade("s", 21);
                },
                onPurchase() {
                    player[this.layer].latestUpgrade = 22; 
                },
              },
              23: {
                title: "Really Boring UP8",
                description: "Multiply starting points gain by 3. ",
                cost: new Decimal(250),
                unlocked() { 
                    return hasUpgrade("s", 22);
            },
                onPurchase() {
                    player[this.layer].latestUpgrade = 23; 
                },
              },
              24: {
                title: "Really Boring UP9",
                description: "Multiply points and starting points gain by 1.5x. ",
                cost: new Decimal(1000),
                unlocked() { 
                    return hasUpgrade("s", 23);
            },
                onPurchase() {
                    player[this.layer].latestUpgrade = 24; 
                },
              },
            },
    })