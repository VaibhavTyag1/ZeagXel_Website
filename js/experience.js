/* =========================================================
   ZEAGXEL EXPERIENCE PAGE
   INTERACTIVE HOME MODES AND ROOM CONTROLS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const modeCards = document.querySelectorAll(".mode-card");
    const controls = document.querySelectorAll(".device-control");
    const scene = document.querySelector(".room-scene");
    const tvVideo = scene?.querySelector(".room-tv-video");
    const panel = document.querySelector(".control-panel");
    const byId = id => document.getElementById(id);

    const modes = {
        home: {
            label: "HOME", title: "Welcome home.", ring: "READY",
            text: "The home prepares itself around you. Lighting, climate and connected loads move into their preferred state.",
            light: true, lightValue: "Warm ambience", fan: true, fanValue: "40%",
            climate: true, climateValue: "24°C", tv: false
        },
        movie: {
            label: "MOVIE", title: "Set the atmosphere.", ring: "SCENE",
            text: "The environment changes together — reducing lighting, preparing connected devices and creating a calmer space.",
            light: true, lightValue: "20% · Dim", fan: true, fanValue: "30%",
            climate: true, climateValue: "23°C", tv: true
        },
        away: {
            label: "AWAY", title: "Everything unnecessary, off.", ring: "AWAY",
            text: "Lights, fan, air conditioning and television are off. Local security is armed while you are away.",
            light: false, lightValue: "Lights off", fan: false, fanValue: "Fan off",
            climate: false, climateValue: "Standby", tv: false
        },
        night: {
            label: "NIGHT", title: "Quiet intelligence.", ring: "NIGHT",
            text: "Selected lighting and essential systems remain available while the rest of the home moves into a quieter state.",
            light: true, lightValue: "10% · Night light", fan: true, fanValue: "25% · Quiet",
            climate: true, climateValue: "24°C · Quiet", tv: false
        }
    };

    function setDevice(device, on, value) {
        if (!scene) return;
        scene.dataset[device === "light" ? "lights" : device] = on ? "on" : "off";
        if (device === "tv" && tvVideo) {
            if (on) {
                tvVideo.play().catch(() => {});
            } else {
                tvVideo.pause();
                tvVideo.currentTime = 0;
            }
        }
        const button = document.querySelector(`[data-device="${device}"]`);
        if (button) button.setAttribute("aria-pressed", String(on));
        const status = byId(`${device}-status`);
        const detail = byId(`${device}-value`);
        if (status) status.textContent = device === "climate" && on ? "COOLING" : on ? "ON" : "OFF";
        if (detail) detail.textContent = value ?? (on ? "On" : "Off");
    }

    function applyMode(name) {
        const mode = modes[name];
        if (!mode || !scene) return;
        scene.dataset.mode = name;
        panel?.classList.add("changing");
        byId("mode-label").textContent = mode.label;
        byId("mode-title").textContent = mode.title;
        byId("mode-text").textContent = mode.text;
        byId("ring-value").textContent = mode.ring;
        setDevice("light", mode.light, mode.lightValue);
        setDevice("fan", mode.fan, mode.fanValue);
        setDevice("climate", mode.climate, mode.climateValue);
        setDevice("tv", mode.tv, mode.tv ? "Playing" : "Screen off");
        window.setTimeout(() => panel?.classList.remove("changing"), 450);
    }

    modeCards.forEach(card => card.addEventListener("click", () => {
        modeCards.forEach(item => item.classList.toggle("active", item === card));
        applyMode(card.dataset.mode);
    }));

    controls.forEach(button => button.addEventListener("click", () => {
        const device = button.dataset.device;
        const stateKey = device === "light" ? "lights" : device;
        const isOn = scene.dataset[stateKey] !== "on";
        const details = {
            light: isOn ? "Warm ambience" : "Lights off",
            fan: isOn ? "40% · Spinning" : "Fan stopped",
            climate: isOn ? "24°C · Cooling" : "AC off",
            tv: isOn ? "Playing" : "Screen off"
        };
        setDevice(device, isOn, details[device]);
    }));

    applyMode("home");
});

/* =========================================================
   ZEAGXEL MOVIE MODE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const trailer = document.getElementById("movieTrailer");
    const soundButton = document.getElementById("movieSound");

    if (!trailer || !soundButton) {
        return;
    }

    let soundEnabled = false;

    soundButton.addEventListener("click", () => {

        if (!soundEnabled) {

            trailer.src =
                "https://www.youtube.com/embed/399Ez7WHK5s?autoplay=1&mute=0&controls=0&loop=1&playlist=399Ez7WHK5s&rel=0&modestbranding=1";

            soundButton.textContent = "SOUND OFF";

            soundEnabled = true;

        } else {

            trailer.src =
                "https://www.youtube.com/embed/399Ez7WHK5s?autoplay=1&mute=1&controls=0&loop=1&playlist=399Ez7WHK5s&rel=0&modestbranding=1";

            soundButton.textContent = "SOUND ON";

            soundEnabled = false;

        }

    });

});
