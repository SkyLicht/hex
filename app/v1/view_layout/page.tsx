'use server'
import IeLiveDetails from "@/components/statistics/line_details/ie_details/IeLiveDetails";
import {MenuLayout} from "@/components/layout/menus/LayoutMenu";
import LayoutCanvaContainer from "@/components/layout/canva/LayoutCanvaContainer";


async function ViewLayout({searchParams}: {
    searchParams: Promise<{ selected_line: string }>;
}) {

    const selectedLineName = (await searchParams).selected_line;

    return <div className={"h-full w-full bg-[#e7e8ed] flex flex-col items-center p-2"}>
        <section className={"h-full w-full relative"}>
            <LayoutCanvaContainer/>
            <div className="absolute top-0 left-0 w-full z-10">
                <MenuLayout/>
            </div>
        </section>

        {/*<section className={"h-2/5 p-2 w-full flex flex-row justify-between drop-shadow-2xl bg-[#eff0f3] rounded-xl"}>*/}
        {/*    /!*<IeLiveDetails selectedLine={selectedLineName}/>*!/*/}
        {/*</section>*/}

    </div>
}


export default ViewLayout;