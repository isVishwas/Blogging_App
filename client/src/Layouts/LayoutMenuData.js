import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isAdministrations, setIsAdministrations] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Administrations');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Administrations') {
            setIsDashboard(false);
        }
    }, [
        history,
        iscurrentState,
        isAdministrations
    ]);

    const menuItems = [

        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "administration",
            label: "Article",
            icon: "lar la address-book",
            link: "/#",
            stateVariables: isAdministrations,
            click: function (e) {
                e.preventDefault();
                setIsAdministrations(!isAdministrations);
                setIscurrentState('Administrations');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "article",
                    label: "My Article's",
                    link: "/article",
                    parentId: "administration",
                },
            ],
        }
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;