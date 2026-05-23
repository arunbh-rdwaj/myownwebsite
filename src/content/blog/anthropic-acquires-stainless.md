---
title: "Anthropic Just Bought the Company That Built the Internet's AI Plumbing"
description: "Stainless quietly powered SDKs for OpenAI, Google, and Cloudflare. Now it belongs to Anthropic — and everything changes."
pubDate: 2026-05-23
author: "Arun Bhardwaj"
tags: ["Anthropic", "Stainless", "SDK", "MCP", "AI", "Developer-Tools"]
heroImage: "../../assets/anthropic-acquires-stainless.png"
heroImageAlt: Anthropic acquires Stainless
---

There's a certain kind of company that nobody outside software engineering ever talks about — until the day it gets acquired for $300 million and everyone suddenly realizes it was holding up the ceiling.

Stainless is that company.

On May 18, 2026, Anthropic announced it had acquired Stainless, the New York-based developer tools startup that has been quietly generating the SDKs powering virtually every major AI lab's API. The deal, first reported by *The Information* and confirmed by Anthropic, is valued at more than $300 million — roughly double Stainless's last valuation of $150 million from its December 2024 Series A, which was backed by Sequoia Capital and Andreessen Horowitz.

It's a move that looks strategic on the surface, but the implications run much deeper than a headline number.

---

## What Even Is Stainless?

Founded in 2022 by **Alex Rattray**, a former Stripe engineer, Stainless built a deceptively simple product: give it an API specification, and it spits out production-ready software development kits (SDKs) across multiple programming languages — TypeScript, Python, Go, Java, Kotlin, and more.

An SDK, for the uninitiated, is the library that sits between an API and the developers trying to use it. When you `pip install anthropic` or `npm install openai`, you're using an SDK. Without it, you'd be writing raw HTTP calls by hand for every single request. SDKs handle authentication, retries, error formatting, type safety, pagination — the invisible scaffolding that makes APIs actually usable.

Doing this well across five or more languages is genuinely hard. Every SDK needs to feel *native* to its language — idiomatic Python looks nothing like idiomatic Go. And when the underlying API changes, every SDK needs to update in lockstep. Rattray built Stainless specifically to solve this: *"I started Stainless because SDKs deserve as much care as the APIs they wrap."*

The kicker? Stainless didn't just serve Anthropic. Its customers included **OpenAI, Google DeepMind, Perplexity, Groq, and Cloudflare**. The same tool was generating the official SDKs for companies that compete directly with each other. It was shared infrastructure — the kind the entire industry leaned on without thinking twice.

---

## How Stainless Powered AI at Scale

Beyond SDKs, Stainless built two other categories of tooling that matter enormously in the agentic AI era:

### CLIs (Command-Line Interfaces)
Stainless generates CLI tools from API specs — so developers can test, debug, and script against an API directly from their terminal. This sounds minor until you realize how much of developer workflow runs through the command line.

### MCP Servers
This is where it gets really interesting. Stainless also generates **Model Context Protocol (MCP) servers** — the connectors that link AI agents to external APIs.

MCP is an open standard Anthropic introduced in November 2024. Rather than letting an AI fire raw, unpredictable API calls, MCP defines structured inputs, outputs, and scoped permissions. An agent operating through MCP knows exactly what it can and can't touch — which is what makes agentic AI deployable at enterprise scale rather than just impressive in demos.

Adoption has been swift. OpenAI incorporated MCP into its Agents SDK in March 2025. Salesforce's Agentforce and Zoom's AI Companion both embed it. In December 2025, Anthropic donated the protocol to the Agentic AI Foundation under the Linux Foundation — signaling that MCP was meant to be the TCP/IP of AI agents, not Anthropic's proprietary moat.

Stainless was generating MCP servers the same way it generated SDKs: from an API spec, automatically, across languages. That made it the connective tissue between AI models and the rest of the software world.

---

## Why Anthropic Bought It

The official framing from Anthropic is about reach. As Katelyn Lesse, Anthropic's Head of Platform Engineering, put it: *"Agents are only as useful as what they can reach."*

That's true, but incomplete. Here's the fuller picture:

### 1. Vertical integration at the connectivity layer

Stainless has powered every single official Anthropic SDK since the company launched its API. By acquiring it, Anthropic brings in-house a team that already knows its codebase intimately. Instead of contracting out SDK maintenance, Anthropic now controls it directly — faster iteration, tighter quality, and no dependency on a third party for core developer experience.

### 2. Controlling the "last mile" of developer experience

A Forrester analyst put it well: *"Stronger control over API design and SDK generation improves reliability and consistency, which reduces integration friction and accelerates time to value."* Anthropic is competing hard for enterprise developers. The easier it is to build with Claude, the stickier the platform becomes.

### 3. Removing shared infrastructure from competitors

This is the strategic gut-punch. OpenAI, Google, and others have been relying on Stainless-generated SDKs. Anthropic is winding down all hosted Stainless products — including the shared SDK generator. Competitors now need to rebuild their SDK pipelines themselves, or find alternatives, while Anthropic's own SDK tooling gets better in private.

Existing customers retain ownership of SDKs they've already generated. But going forward, that shared resource is gone.

At Anthropic's current scale — reportedly a **$30 billion annualized revenue run rate** and 8 of the Fortune 10 as Claude customers — controlling the SDK layer that reaches millions of developers is a multiplier on every dollar of revenue.

---

## What This Means for Everyone Else

### For developers building with Claude
Largely good news, at least in the short term. The Stainless team shifts focus entirely to Claude Platform capabilities. SDK quality should improve. MCP server generation for Claude integrations will get first-class attention. Developers connecting Claude to external tools and data sources are the direct beneficiaries.

### For OpenAI, Google, and other AI labs
This is a headache. Stainless wasn't just convenient — for some labs, it was the primary way their official SDK surfaces stayed current with API changes. Rebuilding that tooling in-house takes time and engineering bandwidth. In a space where developer experience is a competitive differentiator, having to scramble on infrastructure is not where you want to be.

### For companies that used Stainless to build their own SDKs
Hundreds of companies used Stainless to generate SDKs, CLIs, and MCP servers for their own APIs. The wind-down of hosted products means they need to find alternatives: maintaining their current SDKs manually, building internal tooling, or switching to competitors like Speakeasy or Fern. It's manageable, but it's friction no one asked for.

### For the MCP ecosystem
This is the nuanced one. Stainless being absorbed into Anthropic doesn't threaten MCP's open nature — the protocol itself lives at the Linux Foundation. But the best-in-class *tooling* for generating MCP servers now belongs to one company. Whether Anthropic shares those tools broadly or keeps them as a Claude-specific advantage will define how open the agentic ecosystem actually becomes.

---

## The Bigger Picture

The Stainless acquisition signals something broader about where AI competition is heading. For two years, the race was about model quality — benchmark scores, context windows, reasoning benchmarks. That arms race continues, but it's no longer sufficient.

The new front is **developer infrastructure**. The companies that win the next phase of AI won't just have the best models. They'll have the best tools for connecting those models to everything else — APIs, data sources, enterprise systems, and the workflows humans already live in.

Stainless was the quiet infrastructure layer beneath all of that. Anthropic just moved it inside the building.

For $300 million, they bought the front door to every major AI API. Given Anthropic's rumored $900 billion target valuation in an upcoming funding round, that looks less like a bet and more like a lock on the mechanism that makes Claude worth integrating at all.

The plumbing just got a new owner — and it's not shared anymore.

---

*Sources: Anthropic, The Information, TechCrunch, InfoWorld, UC Today, Analytics Insight.*
