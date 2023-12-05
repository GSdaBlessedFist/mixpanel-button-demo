import mixpanel from "mixpanel-browser";
import axios from 'axios';

const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export default class MixpanelTracking {
    private static _instance: MixpanelTracking;

    public static getInstance(): MixpanelTracking {
        if (MixpanelTracking._instance == null) {
            return (MixpanelTracking._instance = new MixpanelTracking())
        }
        return this._instance;
    }
    public constructor() {
        if (MixpanelTracking._instance) {
            throw new Error("MixpanelTracking._instance exists");
        }

        mixpanel.init(mixpanelToken || "",
            {
                debug: true,
                track_pageview: true,
                ignore_dnt: true,
            }
        )
    }
    protected track(name: string, data: object = {}) {
        mixpanel.track(name, data);
    }
    public pageViewed() {
        this.track("pageViewed")
    }
    public buttonPushed() {
        this.track("buttonPushed")

    }
    public impatientClickery(){
        this.track("impatientClickery")
    }
    
}