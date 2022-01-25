function getNoteObj(title, note, date, time) {
    const id = _getId();
    let isSelected = false;
    let ifNew = true;
    let deleting = false;
    let onMouseEnter = false;
    let ifMoving = false;

    function _getId() {
        const tName = title || "";
        return `title_${tName}_${Math.ceil(Math.random() * 999)}`;
    }


    return { title, note, date, id, time, isSelected, ifNew, deleting, onMouseEnter, ifMoving };
}