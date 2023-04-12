package malloc72p.micomet;

import org.cometd.annotation.server.AnnotationCometDServlet;
import org.cometd.examples.ChatService;
import org.cometd.examples.CometDDemoServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletRegistration;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:8080")
public class MicometApplication implements ServletContextInitializer{

	public static void main(String[] args) {
		SpringApplication.run(MicometApplication.class, args);
	}

	@Override
    public void onStartup(ServletContext servletContext) {
        ServletRegistration.Dynamic cometdServlet = servletContext.addServlet("cometd", AnnotationCometDServlet.class);
        String mapping = "/cometd/*";
        cometdServlet.addMapping(mapping);
        cometdServlet.setAsyncSupported(true);
        cometdServlet.setLoadOnStartup(1);
        cometdServlet.setInitParameter("services", ChatService.class.getName());
        cometdServlet.setInitParameter("ws.cometdURLMapping", mapping);

        ServletRegistration.Dynamic demoServlet = servletContext.addServlet("demo", CometDDemoServlet.class);
        demoServlet.addMapping("/demo");
        demoServlet.setAsyncSupported(true);
        demoServlet.setLoadOnStartup(2);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/cometd/*").allowedOrigins("http://localhost:8080");
			}
		};
	}
}
