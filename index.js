import { h, Component, render } from "https://esm.sh/preact";
import htm from "https://esm.sh/htm";
import spells from "./spells.js";

// Initialize htm with Preact
const html = htm.bind(h);

const emojis = {
    Wizard: "📜",
    Druid: "🌳",
    Cleric: "⛪",
    Bard: "🎻",
    Ranger: "🏹",
    Artificer: "🔧",
    Paladin: "⚔️",
    Sorcerer: "🪄",
    Warlock: "😈",
};

const Card = ({
    name,
    level,
    school,
    V,
    S,
    M,
    casting_time,
    higher_levels,
    concentration,
    duration,
    range,
    ritual,
    description,
    cast_higher,
    classes,
    book,
}) => {
    const formattedClasses = classes
        .split(",")
        .map((c) => `${emojis[c]}${c}`)
        .join(" | ");

    return html`
        <article>
            <h2>${name.toUpperCase()}</h2>
            <div class="grid">
                <div>
                    <small>CASTING TIME</small>
                    <p>${casting_time}</p>
                </div>
                <div>
                    <small>RANGE</small>
                    <p>${range.split(",").join(" | ")}</p>
                </div>
            </div>
            <div class="grid">
                <div>
                    <small>COMPONENTS</small>
                    <p>
                        ${V && "👄 verbal"}${S && "👋 somatic"}${M &&
                        "📦 material"}
                    </p>
                </div>
                <div>
                    <small>DURATION</small>
                    <p>
                        ${concentration && "🧠 concentration | "} ⏲️ ${duration}
                    </p>
                </div>
            </div>
            <p></p>
            <blockquote>
                ${description} ${higher_levels}
                <footer>
                    <cite>- ${book}</cite>
                </footer>
            </blockquote>
            <footer>
                <div class="grid">
                    <small>${formattedClasses}</small>
                    <small
                        >🔮 ${school} ${level} ${cast_higher && " | [cantrip]"}
                    </small>
                </div>
            </footer>
        </article>
    `;
};

const Cards = (props) => {
    const { searchFilter } = props;
    let filteredSpells = spells;
    if (searchFilter) {
        filteredSpells = spells.filter((spell) => {
            const {
                name,
                level,
                school,
                V,
                S,
                M,
                casting_time,
                higher_levels,
                concentration,
                duration,
                range,
                ritual,
                description,
                cast_higher,
                classes,
                book,
            } = spell;
            return `${name?.toLowerCase()}`.includes(
                searchFilter?.toLowerCase()
            );
        });
    }
    console.log(filteredSpells);

    return filteredSpells.map((spell) => Card(spell));
};

// const spellCards = spells.map((spell) => Card(spell));

// const filteredSpells = (filter) => spells.filter((spell) => {});

const App = (props) => {
    return html`
        <label for="spellName">
            Search Spells:
            <input
                type="text"
                id="spellName"
                name="spellName"
                placeholder="Search spell here"
            />
        </label>
        <${Cards}
            searchFilter=${document.getElementById("spellName")?.textContent}
        />
    `;
};

render(html`<${App} />`, document.body);
