import { XMLWriter } from '../xml/XMLWriter';
import { XMLReader } from '../xml/XMLReader';
import { JID, JIDHelper } from '../util/jid';
import { IqBase, IqResponse, IqRequest } from './IqBase';

export interface SessionRequest extends IqRequest {
    id: string;
}

export interface SessionResponse extends IqResponse {
    id: string;
    host: string;
}

export class Session extends IqBase {

    public static readonly SESSION_XMLNS = 'urn:ietf:params:xml:ns:xmpp-session';

    public createResponse(response: SessionResponse): XMLWriter {
        return XMLWriter.create()
            .element('iq', XMLWriter.create()
                .attr('type', 'result')
                .attr('from', response.host)
                .attr('id', response.id)
            )
    }

    public isRequest(request: XMLReader): boolean {
        return this.isIq(request, 'set', 'session', Session.SESSION_XMLNS);
    }

    public readRequest(request: XMLReader): SessionRequest {
        const iq = request.getElement('iq');
        const session = iq.getElement('session');
        return {
            id: this.readId(request),
        };
    }
}