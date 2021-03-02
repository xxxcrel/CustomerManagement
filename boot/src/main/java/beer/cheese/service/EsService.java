package beer.cheese.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.core.CountRequest;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.FetchSourceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.fasterxml.jackson.databind.ObjectMapper;

import beer.cheese.entity.User;
import beer.cheese.exception.BaseException;
import beer.cheese.repository.UserRepository;
import beer.cheese.view.ResultEnum;

@Service
public class EsService {

    private final Log logger = LogFactory.getLog(getClass());
    @Autowired
    private RestHighLevelClient highClient;

    private RestClient lowClient;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper mapper;

    @PostConstruct
    public void init() {
        if (highClient != null) {
            lowClient = highClient.getLowLevelClient();
        } else {
            logger.info("highLevelClient not initialized");
        }
    }


    public void getAllUser() {
        Request req = new Request("GET", "/employees/search");
        try {
            Response resp = lowClient.performRequest(req);
            String entityString = EntityUtils.toString(resp.getEntity());
            logger.info(entityString);
        } catch (IOException e) {
            logger.error(e.getMessage());
            throw new BaseException(ResultEnum.ERROR, e.getMessage());
        }
    }

    public void bulkIndex() {
        List<User> users = userRepository.findAll();
        logger.info("users from RMDB: " + users.size());
        BulkRequest bulkRequest = new BulkRequest();
        users.forEach(user -> bulkRequest.add(new IndexRequest("employees").source(mapper.convertValue(user, Map.class))));
        try {
            highClient.bulk(bulkRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Long countIndex(String indexName, String queryString){
        CountRequest countRequest = new CountRequest(new String[]{indexName});
        QueryBuilder
        if(queryString != null && !queryString.isEmpty()){
            countRequest.query(new QueryStringQueryBuilder(queryString));
        }
        try{
            long count = highClient.count(countRequest, RequestOptions.DEFAULT).getCount();
            logger.info("employees count: " + count);
        }catch (IOException e){
            logger.error(e.getMessage());
        }
        return 0L;
    }

    public boolean existsIndex(String indexName){
        GetIndexRequest existsRequest = new GetIndexRequest(indexName);
        boolean exists = false;
        try {
            exists = highClient.indices().exists(existsRequest, RequestOptions.DEFAULT);
            logger.info("employees exists: " + exists);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return exists;
    }
}
