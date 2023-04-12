package malloc72p.micomet.test;

import java.io.IOException;

import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.annotation.server.Configure;
import org.cometd.annotation.server.RemoteCall;
import org.cometd.annotation.server.ServerAnnotationProcessor;
import org.cometd.bayeux.Message;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.ConfigurableServerChannel;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;
import org.cometd.examples.CometDDemoServlet;
import org.cometd.server.BayeuxServerImpl;
import org.cometd.server.authorizer.GrantAuthorizer;
import org.cometd.server.ext.AcknowledgedMessagesExtension;
import org.cometd.server.ext.TimesyncExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.UnavailableException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(CometDDemoServlet.class);

    @Override
    public void init() throws ServletException {
        super.init();
        BayeuxServerImpl bayeux = (BayeuxServerImpl)getServletContext().getAttribute(BayeuxServer.ATTRIBUTE);

        if (bayeux == null) {
            throw new UnavailableException("No BayeuxServer!");
        }

        // Create extensions
        bayeux.addExtension(new TimesyncExtension());
        bayeux.addExtension(new AcknowledgedMessagesExtension());

        // Deny unless granted

        bayeux.createChannelIfAbsent("/**", channel -> channel.addAuthorizer(GrantAuthorizer.GRANT_NONE));

        // Allow anybody to handshake
        bayeux.getChannel(ServerChannel.META_HANDSHAKE).addAuthorizer(GrantAuthorizer.GRANT_PUBLISH);

        ServerAnnotationProcessor processor = new ServerAnnotationProcessor(bayeux);
        processor.process(new EchoRPC());
        processor.process(new Monitor());

        bayeux.createChannelIfAbsent("/foo/bar/baz", new ConfigurableServerChannel.Initializer.Persistent());

        if (logger.isDebugEnabled()) {
            logger.debug(bayeux.dump());
        }
    }

    @Service("echo")
    public static class EchoRPC {
        @Configure("/service/echo")
        private void configureEcho(ConfigurableServerChannel channel) {
            channel.addAuthorizer(GrantAuthorizer.GRANT_SUBSCRIBE_PUBLISH);
        }

        @RemoteCall("echo")
        public void doEcho(RemoteCall.Caller caller, Object data) {
            logger.info("ECHO from " + caller.getServerSession() + ": " + data);
            caller.result(data);
        }
    }

    @Service("monitor")
    public static class Monitor {
        @Listener("/meta/subscribe")
        public void monitorSubscribe(ServerSession session, ServerMessage message) {
            logger.info("Monitored Subscribe from " + session + " for " + message.get(Message.SUBSCRIPTION_FIELD));
        }

        @Listener("/meta/unsubscribe")
        public void monitorUnsubscribe(ServerSession session, ServerMessage message) {
            logger.info("Monitored Unsubscribe from " + session + " for " + message.get(Message.SUBSCRIPTION_FIELD));
        }

        @Listener("/meta/*")
        public void monitorMeta(ServerSession session, ServerMessage message) {
            if (logger.isDebugEnabled()) {
                logger.debug(message.toString());
            }
        }
    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        ((HttpServletResponse)res).sendError(503);
    }
}
