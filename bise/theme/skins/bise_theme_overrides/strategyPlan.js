/* - strategyPlan.js - */

/* - strategyPlan.js - */
// http://biodiversity.europa.eu/portal_javascripts/strategyPlan.js?original=1
var totalHeight = 720;
var totalWidth = 930;
$(function() {
    $(".actionsDiv").css("cursor", "pointer");
    $(".targetId").css("cursor", "pointer");
    $(".targetId").click(function() {
        if (!$(this).parent().hasClass("expanded")) {
            $(".targetId").css("cursor", "auto");
            showBackBar($(this).parent());
            $(".targetDiv").toggleClass("collapsed");
            $(this).parent().toggleClass("collapsed");
            $(this).parent().toggleClass("expanded");
            $(".overviewsDiv").hide();
            $(".midtermsDiv").hide();
            $(".midtermsWhiteDiv").hide();
            $(".indicatorsDiv").hide();
            $(".cifGroupsDiv").hide();
            $(".actionsDiv").hide();
            $(".aichiTargetsDiv").hide();
            $("#mtrGo").hide();
            $(this).parent().find(".targetDesc").css("width", totalWidth);
            $(this).parent().find(".targetDesc").css("height", totalHeight - 120);
            $(this).parent().find(".targetDesc").show()
        }
    });
    $(".actionsDiv").click(function() {
        if (!$(this).parent().hasClass("expanded")) {
            $(".targetId").css("cursor", "auto");
            $(".actionsDiv").css("cursor", "auto");
            showBackBar($(this).parent());
            $(".targetDiv").toggleClass("collapsed");
            $(this).parent().toggleClass("collapsed");
            $(this).parent().toggleClass("expanded");
            $(".overviewsDiv").hide();
            $(".midtermsDiv").hide();
            $(".targetDesc").hide();
            $(".indicatorsDiv").hide();
            $(".cifGroupsDiv").hide();
            $(".actionsDiv").hide();
            $(".aichiTargetsDiv").hide();
            $("#mtrGo").hide();
            $(this).show();
            $(this).children().first().hide();
            $(this).css("height", (totalHeight - 120));
            $(this).parent().find(".action").show();
            $(this).parent().find(".action").css("width", totalWidth);
            var actionCount = $(this).children().length - 1;
            var actionHeight = (totalHeight - 120) / actionCount;
            $(this).parent().find(".action").css("height", actionHeight);
            $(this).parent().find(".actionDesc").show()
        }
    });
    $(".actionBack").css("cursor", "pointer");
    $(".actionBack").click(function() {
        hideBackBar();
        $(".actionDesc").hide();
        $(".actionsExpanded").find(".actionsDiv").css("margin-top", "0px");
        var actionCount = $(".actionsExpanded").find(".actionsDiv").children().length - 1;
        var actionHeight = (totalHeight - 270) / actionCount;
        $(".actionsExpanded").find(".action").css("height", actionHeight);
        $(".actionsExpanded").find(".action").css("cursor", "pointer");
        $(".actionsExpanded").find(".action").css("padding-top", (actionHeight / 2) - 10);
        $(".targetDiv").removeClass("actionsExpanded")
    });
    $(".targetsBack").css("cursor", "pointer");
    $(".targetsBack").click(function() {
        hideBackBar();
        $(".actionBack").css("height", "0px")
        $(".targetDiv").removeClass("collapsed");
        $(".targetDiv").removeClass("expanded");
        $(".targetDiv").removeClass("actionsExpanded");
        $(".targetDesc").hide();
        var divHeight = (totalHeight - 270) / 4;
        $(".targetId").css("cursor", "pointer");
        $(".overviewsDiv").show();
        $(".overviewsDiv").css("cursor", "pointer");
        $(".overviewsDiv").css("height", divHeight);
        $(".overviewsDiv").css("margin-top", "0px");

        $(".midtermsDiv").show();
        $(".midtermsDiv").css("cursor", "pointer");
        $(".midtermsDiv").css("height", divHeight);
        $(".midtermsDiv").css("margin-top", "0px");

        $(".midtermsWhiteDiv").show();
        $(".midtermsWhiteDiv").css("cursor", "pointer");
        $(".midtermsWhiteDiv").css("height", divHeight);
        $(".midtermsWhiteDiv").css("margin-top", "0px");

        $(".actionsDiv").show();
        $(".actionsDiv").css("cursor", "pointer");
        $(".actionsDiv").css("height", divHeight);
        $(".actionsDiv").css("margin-top", "0px");
        $(".actionsDiv").children().hide();
        $(".actionsDiv > div:first-child").show();
        $(".actionDesc").hide();
        $(".indicatorsDiv").show();
        $(".indicatorsDiv").css("cursor", "pointer");
        $(".indicatorsDiv").css("height", divHeight);
        $(".indicatorsDiv").children().hide();
        $(".indicatorsDiv > div:first-child").show();
        $(".cifGroupsDiv").show();
        $(".cifGroupsDiv").css("cursor", "pointer");
        $(".cifGroupsDiv").css("height", divHeight);
        $(".cifGroupsDiv").children().hide();
        $(".cifGroupsDiv > div:first-child").show();
        $(".aichiTargetsDiv").show();
        $(".aichiTargetsDiv").css("cursor", "pointer");
        $(".aichiTargetsDiv").css("height", divHeight);
        $(".aichiTargetsDiv").children().hide();
        $(".aichiTargetsDiv > div:first-child").show()
        $("#mtrGo").show();
    });
    $(".cifGroupsDiv").css("cursor", "pointer");
    $(".cifGroupsDiv").click(function() {
        if (!$(this).parent().hasClass("expanded")) {
            $(".targetId").css("cursor", "auto");
            $(".cifGroupsDiv").css("cursor", "auto");
            showBackBar($(this).parent());
            $(".targetDiv").toggleClass("collapsed");
            $(this).parent().toggleClass("collapsed");
            $(this).parent().toggleClass("expanded");
            $(".overviewsDiv").hide();
            $(".midtermsDiv").hide();
            $(".targetDesc").hide();
            $(".actionsDiv").hide();
            $(".indicatorsDiv").hide();
            $(".aichiTargetsDiv").hide();
            $(".cifGroupsDiv").hide();
            $("#mtrGo").hide();
            $(this).show();
            $(this).children().first().hide();
            $(this).css("height", (totalHeight - 120));
            $(this).parent().find(".cifGroup").show();
            $(this).parent().find(".cifGroup").css("width", totalWidth);
            var indicatorHeight = (totalHeight - 120);
            $(this).parent().find(".action").css("height", indicatorHeight)
        }
    });
    $(".indicatorsDiv").css("cursor", "pointer");
    $(".indicatorsDiv").click(function() {
        if (!$(this).parent().hasClass("expanded")) {
            $(".targetId").css("cursor", "auto");
            $(".indicatorsDiv").css("cursor", "auto");
            showBackBar($(this).parent());
            $(".targetDiv").toggleClass("collapsed");
            $(this).parent().toggleClass("collapsed");
            $(this).parent().toggleClass("expanded");
            $(".overviewsDiv").hide();
            $(".midtermsDiv").hide();
            $(".targetDesc").hide();
            $(".actionsDiv").hide();
            $(".cifGroupsDiv").hide();
            $(".aichiTargetsDiv").hide();
            $(".indicatorsDiv").hide();
            $("#mtrGo").hide();
            $(this).show();
            $(this).children().first().hide();
            $(this).css("height", (totalHeight - 120));
            $(this).parent().find(".indicator").show();
            $(this).parent().find(".indicator").css("width", totalWidth);
            var indicatorHeight = (totalHeight - 120);
            $(this).parent().find(".action").css("height", indicatorHeight)
        }
    });
    $(".aichiTargetsDiv").css("cursor", "pointer");
    $(".aichiTargetsDiv").click(function() {
        if (!$(this).parent().hasClass("expanded")) {
            $(".targetId").css("cursor", "auto");
            $(".aichiTargetsDiv").css("cursor", "auto");
            showBackBar($(this).parent());
            $(".targetDiv").toggleClass("collapsed");
            $(this).parent().toggleClass("collapsed");
            $(this).parent().toggleClass("expanded");
            $(".overviewsDiv").hide();
            $(".midtermsDiv").hide();
            $(".targetDesc").hide();
            $(".indicatorsDiv").hide();
            $(".cifGroupsDiv").hide();
            $(".actionsDiv").hide();
            $(".aichiTargetsDiv").hide();
            $("#mtrGo").hide();
            $(this).show();
            $(this).children().first().hide();
            $(this).css("height", (totalHeight - 120));
            $(this).parent().find(".aichiTarget").show();
            $(this).parent().find(".aichiTarget").css("width", totalWidth);
            var aichiTargetCount = $(this).children().length - 1;
            var aichiTargetHeight = (totalHeight - 120) / aichiTargetCount;
            $(this).parent().find(".aichiTarget").css("height", aichiTargetHeight)
        }
    });

    function showBackBar(target) {
        $(".targetsBack").show();
        $(".targetsBack").css("height", "25px");
        if (target.hasClass("target1Bg")) {
            $(".targetsBack").addClass("target1Backbg")
        } else if (target.hasClass("target2Bg")) {
            $(".targetsBack").addClass("target2Backbg")
        } else if (target.hasClass("target3Bg")) {
            $(".targetsBack").addClass("target3Backbg")
        } else if (target.hasClass("target4Bg")) {
            $(".targetsBack").addClass("target4Backbg")
        } else if (target.hasClass("target5Bg")) {
            $(".targetsBack").addClass("target5Backbg")
        } else if (target.hasClass("target6Bg")) {
            $(".targetsBack").addClass("target6Backbg")
        }
    }

    function hideBackBar() {
        $(".targetsBack").hide();
        $(".targetsBack").css("height", "0px");
        $(".targetsBack").removeClass("target1Backbg");
        $(".targetsBack").removeClass("target2Backbg");
        $(".targetsBack").removeClass("target3Backbg");
        $(".targetsBack").removeClass("target4Backbg");
        $(".targetsBack").removeClass("target5Backbg");
        $(".targetsBack").removeClass("target6Backbg")
    }

    function addActionTooltip() {
        toolTipText = {
            'action-1': "Complete the establishment of the Natura 2000 network and ensure good management",
            'action-1a': "Member States and the Commission will ensure that the phase to establish Natura 2000, including in the marine environment, is largely complete by 2012.",
            'action-1b': "Member States and the Commission will further integrate species and habitat protection and management requirements into key land and water use policies, both within and beyond Natura 2000 areas.",
            'action-1c': "Member States will ensure that management plans or equivalent instruments which set out conservation and restoration measures are developed and implemented in a timely manner for all Natura 2000 sites.",
            'action-1d': "The Commission, together with Member States, will establish by 2012 a process to promote the sharing of experience, good practice and cross-border collaboration on the management of Natura 2000, within the biogeographical frameworks set out in the Habitats Directive.",
            'action-2': "The Commission, together with Member States, will establish by 2012 a process to promote the sharing of experience, good practice and cross-border collaboration on the management of Natura 2000, within the biogeographical frameworks set out in the Habitats Directive.",
            'action-3': "Increase stakeholder awareness and involvement and improve enforcement",
            'action-3a': "The Commission, together with Member States, will develop and launch a major communication campaign on Natura 2000 by 2013.",
            'action-3b': "The Commission and Member states will improve cooperation with key sectors and continue to develop guidance documents to improve their understanding of the requirements of EU nature legislation and its value in promoting economic development.",
            'action-3c': "The Commission and Member States will facilitate enforcement of the nature directives by providing specific training programmes on Natura 2000 for judges",
            'action-4': "Improve and streamline monitoring and reporting",
            'action-4a': "The Commission, together with Member States, will develop by 2012 a new EU bird reporting system, further develop the reporting system under Article 17 of the Habitats Directive and improve the flow, accessibility and relevance of Natura 2000 data.",
            'action-4b': "The Commission will create a dedicated ICT tool as part of the Biodiversity",
            'action-5': " Member States, with the assistance of the Commission, will map and assess the state of ecosystems and their services in their national territory by 2014, assess the economic value of such services, and promote the integration of these values into accounting and reporting systems at EU and national level by 2020",
            'action-6': "Set priorities to restore and promote the use of green infrastructure",
            'action-6a': "By 2014, Member States, with the assistance of the Commission, will develop a strategic framework to set priorities for ecosystem restoration at sub-national, national and EU level. ",
            'action-6b': "The Commission will develop a Green Infrastructure Strategy by 2012 to promote the deployment of green infrastructure in the EU in urban and rural areas, including through incentives to encourage up-front investments in green infrastructure projects and the maintenance of ecosystem services, for example through better targeted use of EU funding streams and Public Private Partnerships.",
            'action-7': "Ensure no net loss of biodiversity and ecosystem services",
            'action-7a': "In collaboration with the Member States, the Commission will develop a methodology for assessing the impact of EU funded projects, plans and programmes on biodiversity by 2014.",
            'action-7b': "The Commission will carry out further work with a view to proposing by 2015 an initiative to ensure there is no net loss of ecosystems and their services (e.g. through compensation or offsetting schemes).",
            'action-8': "Enhance direct payments for environmental public goods in the EU Common Agricultural Policy",
            'action-8a': "The Commission will propose that CAP direct payments will reward the delivery of environmental public goods that go beyond cross-compliance (e.g. permanent pasture, green cover, crop rotation, ecological set-aside, Natura 2000).",
            'action-8b': "The Commission will propose to improve and simplify GAEC (Good Agricultural and Environmental Conditions) cross-compliance standars and consider including the Water Framework Directive within the scope of cross-compliance once the Directive has been implemented and the operational obligations for farmers have been identified in order to improve the state of aquatic ecosystems in rural areas.",
            'action-9': "Better target Rural Development to biodiversity conservation",
            'action-9a': "The Commission and Member States will integrate quantified biodiversity targets into Rural Development strategies and programmes, tailoring action to regional and local needs.",
            'action-9b': "The Commission and Member States will establish mechanisms to facilitate collaboration among farmers and foresters to achieve continuity of landscape features, protection of genetic resources and other cooperation mechanisms to protect biodiversity.",
            'action-10': "The Commission and Member States will encourage the uptake of agri-environmental measures to support genetic diversity in agriculture and explore the scope for developing a strategy for the conservation of genetic diversity.",
            'action-11': "Encourage forest holders to protect and enhance forest biodiversity",
            'action-11a': "Member States and the Commission will encourage the adoption of Management Plans,31 inter alia through use of rural development measures32 and the LIFE+ programme.",
            'action-11b': "Member States and the Commission will foster innovative mechanisms (e.g. Payments for Ecosystem Services) to finance the maintenance and restoration of ecosystem services provided by multifunctional forests.",
            'action-12': "Member States will ensure that forest management plans or equivalent instruments include as many of the following measures as possible: - maintain optimal levels of deadwood, taking into account regional variations such as fire risk or potential insect outbreaks;- preserve wilderness areas; - ecosystem-based measures to increase the resilience of forests against fires as part of forest fire prevention schemes, in line with activities carried out in the European Forest Fire Information System (EFFIS); - specific measures developed for Natura 2000 forest sites; - ensuring that afforestation is carried out in accordance with the Pan-European Operational Level Guidelines for SFM, in particular as regards the diversity of species, and climate change adaptation needs.",
            'action-13': "Improve the management of fished stocks",
            'action-13a': "The Commission and Member States will maintain and restore fish stocks to levels that can produce MSY in all areas in which EU fish fleets operate, including areas regulated by Regional Fisheries Management Organisations, and the waters of third countries with which the EU has concluded Fisheries Partnership Agreements. ",
            'action-13b': "The Commission and Member States will develop and implement under the CFP long-term management plans with harvest control rules based on the MSY approach. These plans should be designed to respond to specific time-related targets and be based on scientific advice and sustainability principles.",
            'action-13c': "The Commission and Member States will significantly step up their work to collect data to support implementation of MSY. Once this objective is attained, scientific advice will be sought to incorporate ecological considerations in the definition of MSY by 2020.",
            'action-14': "Eliminate adverse impacts on fish stocks, species, habitats and ecosystems",
            'action-14a': "The EU will design measures to gradually eliminate discards, to avoid the by-catch of unwanted species and to preserve vulnerable marine ecosystems in accordance with EU legislation and international obligations.",
            'action-14b': "The Commission and Member States will support the implementation of the Marine Strategy Framework Directive, including through providing financial incentives through the future financial instruments for fisheries and maritime policy for marine protected areas (including Natura 2000 areas and those established by international or regional agreements). This could include restoring marine ecosystems, adapting fishing activities and promoting the involvement of the sector in alternative activities, such as eco-tourism, monitoring and managing marine biodiversity, and combating marine litter.",
            'action-15': "The Commission will integrate additional biodiversity concerns into the Plant and Animal Health regimes by 2012.",
            'action-16': "The Commission will fill policy gaps in combating IAS by developing a dedicated legislative instrument by 2012.",
            'action-17': "Reduce indirect drivers of biodiversity loss",
            'action-17a': "Under the EU flagship initiative on resource efficiency, the EU will take measures (which may include demand and/or supply side measures) to reduce the biodiversity impacts of EU consumption patterns, particularly for resources that have significant negative effects on biodiversity. ",
            'action-17b': "The Commission will enhance the contribution of trade policy to conserving biodiversity and address potential negative impacts by systematically including it as part of trade negotiations and dialogues with third countries, by identifying and evaluating potential impacts on biodiversity resulting from the liberalisation of trade and investment through ex-ante Trade Sustainability Impact Assessments and ex-post evaluations, and seek to include in all new trade agreements a chapter on sustainable development providing for substantial environmental provisions of importance in the trade context including on biodiversity goals.",
            'action-17c': "The Commission will work with Member States and key stakeholders to provide the right market signals for biodiversity conservation",
            'action-18': "Mobilise additional resources for global biodiversity conservation",
            'action-18a': "The Commission and Member States will contribute their fair share to international efforts to significantly increase resources for global biodiversity as part of the international process aimed at estimating biodiversity funding needs and adopting resource mobilisation targets for biodiversity at CBD CoP11 in 2012.",
            'action-18b': "The Commission will improve the effectiveness of EU funding for global biodiversity inter alia by supporting natural capital assessments in recipient countries and the development and/or updating of National Biodiversity Strategies and Action Plans, and by improving coordination within the EU and with key non-EU donors in implementing biodiversity assistance/projects.",
            'action-19': "The Commission will continue to systematically screen its development cooperation action to minimise any negative impact on biodiversity, and undertake Strategic Environmental Assessments and/or Environmental Impact Assessments for actions likely to have significant effects on biodiversity.",
            'action-20': "The Commission will propose legislation to implement the Nagoya Protocol on Access to Genetic Resources and the Fair and Equitable Sharing of Benefits Arising from their Utilisation in the European Union so that the EU can ratify the Protocol as soon as possible and by 2015 at the latest, as required by the global target.",
        

            'target-1': "To halt the deterioration in the status of all species and habitats covered by EU nature legislation and achieve a significant and measurable improvement in their status so that, by 2020, compared to current assessments:(i) 100% more habitat assessments and 50% more species assessments under the Habitats Directive show an improved conservation status; and (ii) 50% more species assessments under the Birds Directive show a secure or improved status.",
            'target-2': "By 2020, ecosystems and their services are maintained and enhanced by establishing green infrastructure and restoring at least 15 % of degraded ecosystems.",
            'target-3': "Agriculture: By 2020, maximise areas under agriculture across grasslands, arable land and permanent crops that are covered by biodiversity. Forests: By 2020, Forest Management Plans or equivalent instruments, in line with Sustainable Forest Management (SFM), are in place for all forests that are publicly owned and for forest holdings above a certain size",
            'target-3a': "Agriculture: By 2020, maximise areas under agriculture across grasslands, arable land and permanent crops that are covered by biodiversity related measures under the CAP so as to ensure the conservation of biodiversity and to bring about a measurable improvement in the conservation status of species and habitats",
            'target-3b': "Forests: By 2020, Forest Management Plans or equivalent instruments, in line with Sustainable Forest Management (SFM), are in place for all forests that are publicly owned and for forest holdings above a certain size that receive funding under the EU Rural Development Policy so as to bring about a measurable improvement in the conservation status of species and habitats",
            'target-4': "Achieve Maximum Sustainable Yield (MSY) by 2015. Achieve a population age and size distribution indicative of a healthy stock, through fisheries management with no significant adverse impacts on other stocks, species and ecosystems, in support of achieving Good Environmental Status by 2020, as required under the Marine Strategy Framework Directive",
            'target-5': "By 2020, Invasive Alien Species (IAS) and their pathways are identified and prioritised, priority species are controlled or eradicated, and pathways are managed to prevent the introduction and establishment of new IAS.",
            'target-6': "By 2020, the EU has stepped up its contribution to averting global biodiversity loss.",
        }
        for (var key in toolTipText) {
            selector = "td." + key + " p"
            element = $(selector)
            if (element.length)
                element.attr("data-tooltip", toolTipText[key]);
        }
    }
    addActionTooltip();


    function UpdateTableHeaders() {
        $(".persist-row").each(function() {
            var el             = $(this),
                offset         = el.offset(),
                scrollTop      = $(window).scrollTop(),
                floatingHeader = el.next().first(),
                next           = el.next("[class*='target']").first();

        if ((scrollTop > offset.top) && (scrollTop < offset.top + next.offset().top)) {
            floatingHeader.css({"visibility": "visible"});
        } else {
            floatingHeader.css({"visibility": "hidden"});};
        });
    }

    // DOM Ready
    $(function() {
        var clonedHeaderRow;
        $(".persist-row").each(function() {
            // [class*="target"];
            clonedHeaderRow = $(this);
            clonedHeaderRow
              .before(clonedHeaderRow.clone())
              .css("width", clonedHeaderRow.width())
              .removeClass("persist-row")
              .addClass("floatingHeader");
        });
        $(window).scroll(UpdateTableHeaders).trigger("scroll");
    });
});

