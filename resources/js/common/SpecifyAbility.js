export const specifyAbility = (ability, type = null) => {
    if (type === "exh") {
        if (ability === -1) return "未登録";
        if (ability === 12) return "???";
        return "難易度" + (12 - ability);
    }

    //easy, clear
    switch (ability) {
        case 0: return "地力S+";
        case 1: return "個人差S+";
        case 2: return "地力S";
        case 3: return "個人差S";
        case 4: return "地力A+";
        case 5: return "個人差A+";
        case 6: return "地力A";
        case 7: return "個人差A";
        case 8: return "地力B+";
        case 9: return "個人差B+";
        case 10: return "地力B";
        case 11: return "個人差B";
        case 12: return "地力C";
        case 13: return "個人差C";
        case 14: return "地力D";
        case 15: return "個人差D";
        case 16: return "地力E";
        case 17: return "個人差E";
        case 18: return "地力F";
        case 19: return "未登録";
    }
};