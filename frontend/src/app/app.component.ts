import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  result = [
    "api # 2",
    "api # 2",
    "api # 2",
    "api # 2",
    "api # 2",
  ]

  CATEGORY = ['Advertising',     'Answers',
    'Auctions',         'Backend',         'Blog Search',
    'Blogging',         'Bookmarks',       'Calendar',
    'Catalog',          'Chat',            'Database',
    'Dating',           'Dictionary',      'Education',
    'Email',            'Enterprise',      'Entertainment',
    'Events',           'Fax',             'Feeds',
    'File Sharing',     'Financial',       'Food',
    'Games',            'Goal Setting',    'Government',
    'Internet',         'Job Search',      'Mapping',
    'Media Management', 'Media Search',    'Medical',
    'Messaging',        'Music',           'News',
    'Office',           'Other',           'Other Search',
    'PIM',              'Payment',         'Photos',
    'Politics',         'Portal',          'Project Management',
    'Real Estate',      'Recommendations', 'Reference',
    'Retail',           'Science',         'Search',
    'Security',         'Shipping',        'Shopping',
    'Social',           'Sports',          'Storage',
    'Tagging',          'Telephony',       'Tools',
    'Transportation',   'Travel',          'Utility',
    'Video',            'Weather',         'Widgets',
    'Wiki'];

  PROTOCOLS = [
    '  JSON-RPC',
    ' ActionScript',
    ' Actionscript',
    ' Ajax',
    ' Atom',
    ' Atom Publishing Protocol',
    ' Atom Publishing Protocol (Atom/RSS)',
    ' Bebo Platform',
    ' C#',
    ' C++',
    ' CMIS',
    ' CSS',
    ' ChangeSets',
    ' Cocoa',
    ' DDE',
    ' EMI/UCP',
    ' EPP',
    ' FTP',
    ' Facebook Platform',
    ' Flash',
    ' GData',
    ' GET',
    ' Google Transit Feed Specification (GTFS)',
    ' HTML5',
    ' HTTP',
    ' HTTP GET',
    ' HTTP POST',
    ' HTTP Post',
    ' HTTP Request',
    ' HTTPS',
    ' JSON',
    ' JSON-RPC',
    ' Jacascript',
    ' Java',
    ' JavaScipt',
    ' JavaScript',
    ' Javascript',
    ' OAI-PMH',
    ' OAuth',
    ' ODATA',
    ' OpenSearch',
    ' OpenSocial',
    ' OpenURL',
    ' PAP',
    ' PHP ',
    ' POST',
    ' Post Form',
    ' PubSubHubbub',
    ' RDF',
    ' REST',
    ' REST ',
    ' RET',
    ' RPC',
    ' RSS',
    ' RTMP',
    ' RTP',
    ' SCP',
    ' SHP',
    ' SIP',
    ' SMPP',
    ' SMS',
    ' SMTP',
    ' SOAP',
    ' SOAP/HTTPS',
    ' SPARQL',
    ' SPASEQL',
    ' SRU',
    ' SSL',
    ' STOMP',
    ' Salmon',
    ' Server-to-Server',
    ' Silverlight',
    ' Streaming',
    ' TCP',
    ' UDP',
    ' VB',
    ' WMS',
    ' Wave Data Model',
    ' WebFinger',
    ' WebSockets',
    ' XLIFF',
    ' XML',
    ' XML-RCP',
    ' XML-RPC',
    ' XML-RPC  ',
    ' XMPP',
    ' YQL',
    ' cURL',
    ' http',
    ' https',
    ' or SOAP',
    ' sFTP',
    ' saml',
    ' sqsso',
    ' unAPI',
    'AGI',
    'AIM (OSCAR)',
    'AJAX',
    'ActionScript',
  ];

  constructor(private searchService: SearchService) {
  }

  fetchApisWithFilters(updatedYear: number, protocols: string[],
                       category: string[], tags: string[], rating: number, compare: string) {
    this.result = [];
    this.searchService.fetchApiWithFilters(updatedYear, protocols, category, tags, rating, compare)
      .subscribe(results => this.result = results);
  }

  fetchApisWithKeywords(keywords: string[]) {
    this.result = [];
    this.searchService.fetchApiWithKeywords(keywords)
      .subscribe(results => this.result = results);
  }

  fetchMashupsWithFilters(updatedYear: number, apisUsed: string[], tags: string[]) {
    this.result = [];
    this.searchService.fetchMashupWithFilters(updatedYear, apisUsed, tags)
      .subscribe(results => this.result = results);
  }

  fetchMashupsWithKeywords(keywords: string[]) {
    this.result = [];
    this.searchService.fetchMashupWithKeywords(keywords)
      .subscribe(results => this.result = results);
  }

  fetchTopKApis(k: number) {
    this.result = [];
    this.searchService.fetchTopKApis(k)
      .subscribe(results => this.result = results);
  }

  fetchTopKMashups(k: number) {
    this.result = [];
    this.searchService.fetchTopKMashups(k)
      .subscribe(results => this.result = results);
  }



}
