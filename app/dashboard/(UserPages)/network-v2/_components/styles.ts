'use client'

import styled from 'styled-components';

export const Wrapper = styled.div`
  .page_content {


    .root ul{
      text-align: center;
      position: relative;
          list-style: none;
        padding:0;
      }
      .root li{
      
          
      }
      .root .pad-left{  
          position: relative; 
          margin: 0;
      }
      .root .pad-left.has-child{
        // background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
        // background-size: 50% 100%;
        // background-position: right;
        // background-repeat: no-repeat;
      }
      .root .pad-right.has-child{
        background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
        background-size: 50% 100%;
        background-position: left;
        background-repeat: no-repeat;
      }
      .root .p-more-left-x1{ 
          right: 0px; 
      }
      .root .p-more-right-x1{ 
        right: 0px; 
    }
      
      .root .pad-right{  
          position: relative; 
          margin: 0;
      }
      
      .root .right [class*="p-more-right-"],.root .right > li:first-child{  
          background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
          background-size: 50% 100%;
          background-position: left;
          background-repeat: no-repeat;
          
      }
       
      .root .left [class*="p-more-left-"], .root .left > li:first-child{ 
          background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
          background-size: 50% 100%;
          background-position: right;
          background-repeat: no-repeat;
          
      }
      .root  .pad-right.has-child + li{
        background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
        background-size: 50% 100%;
        background-position: left;
        background-repeat: no-repeat;
      }
      .root  .pad-left.has-child + li{
        background-image: linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px), linear-gradient(to bottom, #ccc 1px, rgba(255,255,255,0) 1px);
        background-size: 50% 100%;
        background-position: right;
        background-repeat: no-repeat;
      }
      .root .right > li:first-child, .root .left > li:first-child{
      margin-top: 5px;
      }
      .root .p-more-left-x1 + li.p-more-left-x1{
      background:none;
      }
      .root .p-more-left-x2 + li.p-more-left-x2{
      background:none;
      }
      .root .p-more-left-x3 + li.p-more-left-x3{
      background:none;
      }
      .root .p-more-left-x4 + li.p-more-left-x4{
      background:none;
      }
        .root .p-more-right-x1 + li.p-more-right-x1{
      background:none;
      }
      .root .p-more-right-x2 + li.p-more-right-x2{
      background:none;
      }
      .root .p-more-right-x3 + li.p-more-right-x3{
      background:none;
      }
      .root .p-more-right-x4 + li.p-more-right-x4{
      background:none;
      }
      

      .root .pad-left > ul > li, .root .pad-right > ul > li{
      margin:0;
      padding: 0;
      }
      .root li p{
        width: 120px; 
        border: solid 1px #ccc;
          padding: 5px;
        white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        margin: 5px auto;
        line-height: initial;
        border-radius: 5px;

      }
      .root li a{ 
      }
      .root{
            width: 500px;
          margin: 0 auto;
        font-size:11px;
        
      } 
      .left .right .left{
        display:none;
      }
      .right .left .right{
        display:none;
      }
      .root > ul::after{
       content: "";
          position: absolute;
          /* bottom: 30px; */
          border-bottom: 1px solid #ccc;
          width: 200px;
          padding-left: 0px;
          left: 50%;
          /* margin: 0 100px; */
          left: 50%;
          transform: translate(-50%, 0%);
          bottom: -6px;
      }
      .root > ul >.center::before{ 
          position: absolute;
          bottom: -5px;
          border-right: 1px solid #ccc;
          width: 0px;
          height: 15px;
          padding-right: 0px;
           
      }
      .root li::before {
        content: "";
        position: absolute;
        bottom: -10px;
        border-right: 1px solid #ccc;
        width: 0px;
        height: 20px;
        padding-right: 0px;
        left:50%;
      }
      .root li.has-child .center::before {
        height: 16px;
        top: 26px;
      } 
      .root li:last-child::before{
       border-right: 1px dotted #ccc;
      }
      .root li.has-child::before {
          display:none
      }
      .root li:last-child::after{
        display:none;
      }
      .root li.has-child>li::before {
          height: 10px;
      }
      .root li {
          padding: 5px 0;
      }
      <!-- .right > li::after{ -->
      <!-- display:none; -->
      <!-- } -->
      .root .left .right li::after{
       height:18px;
      }
      .root .right .left li::after{
       height:18px;
      } 
      
      .root .has-child::after{
      display:none; 
      }
      .root .pad-left li::after, .root [class*="p-more-left-"]::after {
         content: "";
          position: absolute;
          bottom: 36px;
          border-left: 1px solid #ccc; 
          height: calc(100% - 26px); 
        padding-left: 0px;
      }
       .root .pad-right li::after,  .root [class*="p-more-right-"]::after {
        content: "";
         position: absolute;
         bottom: 36px;
         border-right: 1px solid #ccc; 
         height: calc(100% - 26px); 
       padding-left: 0px;
     } 
     .p-more-right-x1:last-child::before{
      content: " ";
      position: absolute;
      top: -10px;
      border-right: 1px solid #ccc !important;
      height: calc(100% - 26px);
      padding-left: 0px;
     }
       
      .root .left{
      float: right;
          position: relative;
          right: 70%;
      }
      .root .right{ 
         float: left;
          position: relative;
          left: 70%;
      } 
      .root .right::after {
          content: "";
          position: absolute;
          top: 5px;
          border-left: 1px solid #ccc;
          height: 10px;
          padding-left: 0px;
      }
      .root .right .pad-right .p-more-right-x1:last-child{
        background:none;
      }
      .root .right::after{
        left:50%;
      }
      .root .left::after {
          content: "";
          position: absolute;
          top: 5px;
          border-left: 1px solid #ccc;
          height: 10px;
          padding-left: 0px;
      }
      @media (max-width: 768px) {
        .root {
          width:95%;
        }
        .root li p{
          width: 90px;  
  
        }
      }
 
`;
