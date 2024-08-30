import YAML from 'yaml';

export async function loadTheme (theme="default") {
    console.log('## loading theme')
    const response = await fetch('themes/default_theme.yaml');
    const theme_text = await response.text();
    const chart_theme = YAML.parse(theme_text);
    console.log("### chart theme", chart_theme)
    return chart_theme
} 

export function createStyle (theme={}) {
    const groupedStyle = groupStyleProperties(theme);
    let styleString = stringifyStyle(groupedStyle);

    return `<style>${styleString}\n.domain{visibility: hidden}</style>`
}

function groupStyleProperties (theme) {
    const groupedStyle = {};
    for (const [key,value] of Object.entries(theme)) {
        const [element, property] = key.split('_');
        if (!groupedStyle[element]) {
            groupedStyle[element] = {};
        }
        groupedStyle[element][property] = value;
    }
    return groupedStyle;
}

function stringifyStyle (style) {
    const classes = ['axis-label', 'tick-label', 'chart-link'];
    let styleString = "";
    for (const [key, value] of Object.entries(style)) {
        let prefix = classes.includes(key) ? '.' : '#';
        styleString += `\n${prefix}${key}  `+JSON.stringify(value).replace(/"/g, '').replace(/,/g, ';');
    }
    return styleString;
}