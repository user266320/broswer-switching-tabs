
let tabs = [{id:0,url:''}];
// adding new tabs item
function addTabIteam (){
    const tabId=tabs.length;
    tabs.push({id:tabId,url:''});
    return tabId;
}
// remove tabs
function removeTabItems(tabId){
    tabs=tabs.filter((each)=> each.id != tabId);
}
// changing existing tab url
function updateTabUrl(tabId,url){
    tabs[tabId].url=url;
}

// adding new tab
function tabView() {
    const $tabContainer = $('.tab-list-conatiner');
    $tabContainer.empty(); 
    const $tabs = tabs.map((tab, index) => {
        const tabClass = tab.active ? 'active' : '';
        return $(`
            <div class='tab ${tabClass}'  data-id='${index}'>
                <input class='tab-input' type="text" placeholder="Enter URL........." value='${tab.url || ''}'/>
                <button class='close-btn'>X</button>
            </div>
        `);
    });
    $tabContainer.append($tabs);
}

// content display
function tabContentView(url){
    const $tabContent = $('#tab-content');
    $tabContent.empty();
    if(url){
        if(url.startsWith('http')){
            const $iframe = $('<iframe>');
            $iframe.addClass('iframe');
            $iframe.attr({
                'src': url,
                'width': '100%',
                'frameborder': '0'
            });
            $iframe.css('height', '80vh');
            $('#tab-content').append($iframe); 


        }else{
            $('#tab-content').append($(`<iframe src="${url}"></iframe>`));
        }
    }

}

// controller to adding tab
function addTabController(){
    const tabId=addTabIteam();
    tabView();
    tabContentView('');
    swithTabController(tabId)
}
// conteroller to removeing tab
function removeTabController(tabId){
    const removedTabIndex=tabs.findIndex(tab=>tab.id===tabId)
    tabs.splice(removedTabIndex,1);
    const activeTabId = tabs.length >0 ? tabs[Math.max(removedTabIndex-1,0)].id:null;
    tabView();
    if (activeTabId !== null){
        swithTabController(activeTabId);
    }else{
        $('.tab-content').empty();
    }
}
// controller to switchonh tab
function swithTabController(tabId){
    $('.tabs-main-container').remove('active');
    $('.tabs-main-container[data-id="' + tabId + '"]').addClass('active');
    const tab=tabs.find(tab=>tab.id===tabId);
    tabContentView(tab.url)
}  

$(document).ready(function(){
    tabView()
    tabContentView('');
    // event listener for adding new tab
    $('#add-tab').on('click',addTabController);
    // event listener for closing tabs
    $('.tab-list-conatiner').on('click','.close-btn',function(){
        const tabId =$(this).parent().data('id');
        removeTabController(tabId)
    })
    // event listener for changing url-iframe
    $('.tab-list-conatiner').on('keydown','.tab-input',function(e){
        if(e.key==='Enter'){
           
            const tabId =$(this).parent().data('id');
            const url = $(this).val();
            updateTabUrl(tabId,url);
            swithTabController(tabId);
    
        }
    });
    // event listener for changing content
    $('.tab-list-conatiner').on('click','.tab-input',function(){
        const tabId=$(this).parent().data('id');
        swithTabController(tabId);
    });
});

