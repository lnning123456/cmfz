package com.baizhi.esrepository;

import com.baizhi.dao.ArticleDao;
import com.baizhi.entity.Article;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.transport.client.PreBuiltTransportClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;

@Component
public class Espository extends TimerTask {
    @Autowired
    ArticleDao articleDao;

    public void saveEs() throws IOException {
        TransportClient transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));

        List<Article> articles = articleDao.findAll();
        for (Article article : articles) {

            XContentBuilder xContentBuilder = XContentFactory.jsonBuilder();
            xContentBuilder.startObject()
                    .field("title", article.getTitle())
                    .field("content", article.getContent())
                    .field("id", article.getId())
                    .endObject();
            transportClient.prepareIndex("articles", "article").setSource(xContentBuilder).get();
        }
    }

    public void delete() throws UnknownHostException {
        TransportClient transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));
        transportClient.admin().indices().prepareDelete("articles").execute().actionGet();
    }

    public List<Map> search(String query) {
        TransportClient transportClient;
        try {
            transportClient = new PreBuiltTransportClient(Settings.EMPTY).addTransportAddress(new TransportAddress(InetAddress.getByName("192.168.152.131"), 9300));
        } catch (UnknownHostException e) {
            //  e.printStackTrace();
            throw new RuntimeException("transportClient");
        }
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.requireFieldMatch(false).preTags("<font color='red'>").postTags("</font>").field("*");
        List<Map> list = new ArrayList<>();
        QueryStringQueryBuilder queryStringQueryBuilder = QueryBuilders.queryStringQuery(query)
                .field("title")
                .field("content");
        SearchResponse searchResponse = transportClient.prepareSearch("articles")
                .setTypes("article")
                .setQuery(queryStringQueryBuilder)
                .highlighter(highlightBuilder)
                .get();
        SearchHit[] hits = searchResponse.getHits().getHits();
        for (SearchHit hit : hits) {
            Map<String, HighlightField> highlightFields = hit.getHighlightFields();
            Map<String, Object> sourceAsMap = hit.getSourceAsMap();
            for (String key : highlightFields.keySet()) {
                sourceAsMap.put(key, highlightFields.get(key).getFragments()[0].toString());
            }
            list.add(sourceAsMap);
        }
        return list;
    }

    @Override
    public void run() {
        System.out.println("现在是" + new Date());
    }
}
